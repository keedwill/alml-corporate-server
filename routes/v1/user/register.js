const { Router } = require("express");
const { User } = require("../../../models");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, address, password, password2 } = req.body;

  //check required fields
  if (!email) {
    return res.status(400).send({ message: "Email Field is Required" });
  }
  if (!name) {
    return res.status(400).send({ message: "Name Field is Required" });
  }
  if (!address) {
    return res.status(400).send({ message: "Address Field is Required" });
  }
  if (!password || !password2) {
    return res.status(400).send({ message: "Password Fields are Required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ message: "Password Must Be at least Characters" });
  }

  let user = await User.findOne({ where: { email } });

  if (user) {
    return res
      .status(400)
      .send({ message: "User With That Email Already Exist" });
  }

  const newUser = new User({
    name,
    email,
    address,
    phone,
    password,
  });

  //hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
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
