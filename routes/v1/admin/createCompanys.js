const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { User } = require("../../../models");
const bcrypt = require('bcrypt')
const router = Router();

router.post("/companys", requireAdmin, async (req, res) => {
  try {
    const { name, email, phone, address, password, password2, image } =
      req.body;

    //check required fields
    if (!name) {
     return res.status(400).send({ message: "(name) Field is Required" });
    }
    if (!email) {
     return res.status(400).send({ message: "(email) Field is Required" });
    }
    if (!phone) {
     return res.status(400).send({ message: "(phone) Field is Required" });
    }
    if (!address) {
      return res.status(400).send({ message: "(address) Field is Required" });
    }
    if (!password) {
     return res.status(400).send({ message: "(password) Field is Required" });
    }
    if (!password2) {
     return res.status(400).send({ message: "(password2) Field is Required" });
    }
    if (!image) {
     return res.status(400).send({ message: "(image) Field is Required" });
    }

    //check passwords match
    if (password !== password2) {
    return  res.status(400).send({ message: "Passwords Do Not Match" });
    }

    let user = await User.findOne({ where: { email } });

    if (user) {
    return  res.status(400).send({ message: "User With That Email Already Exist" });
    }

    const newUser = new User({
      name,
      email,
      phone,
      address,
      password,
      password2,
      image,
    });
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          return res
            .status(200)
            .send({ message: "Company Created Successfully" });
        });
      });
    });
  } catch (error) {
    
   return res.status(500).send({ message: error });
  }
});

let createcompany = router;

module.exports = createcompany;
