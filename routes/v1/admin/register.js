const { Router } = require("express");
const { Admin } = require("../../../models");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, password2 } = req.body;

  //check required fields
  if (!email) {
    return res.status(400).send({ message: "Email Field is Required" });
  }
  if (!password || !password2) {
    return res.status(400).send({ message: "Password Fields are Required" });
  }

  //check passwords match
  if (password !== password2) {
    return res.status(400).send({ message: "Passwords Do Not Match" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ message: "Password Must Be at least Characters" });
  }

  let oldAdmin = await Admin.findOne({ where: { email } });

  if (oldAdmin) {
    return res.status(400).send({ message: "User Already Exist" });
  }

  const admin = new Admin({
    email,
    status: "active",
    password,
  });

  //hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) throw err;
      admin.password = hash;
      admin
        .save()
        .then((user) => {
          res.status(200).send({
            message: "User Succesfully Created",
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    });
  });
});

let registerRouter = router;

module.exports = registerRouter;
