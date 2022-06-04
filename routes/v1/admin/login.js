const { Router } = require("express");
const { Admin } = require("../../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email Field is Required" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password Field is Required" });
  }

  Admin.findOne({ where: { email } })
    .then((user) => {
      if (!user || user.status !== "active") {
        throw "User Does Not Exist";
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          res.status(200).json({
            userId: user.id,
            email:user.email,
            role: user.role,
            token: jwt.sign(
              { userId: user.id, role: user.role },
              process.env.SECRET_KEY,
              {
                expiresIn: "10m",
              }
            ),
          });
        } else {
          return res
            .status(400)
            .send({ message: "Password  is Incorrect" });
        }
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
});

let loginRouter = router;

module.exports = loginRouter;
