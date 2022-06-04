const { Router } = require("express");
const { ensureAuth } = require("../../../config/auth");
const router = Router();

router.get("/logout", ensureAuth, (req, res) => {
  res.clearCookie("user_sid");
  delete req.session.user;

  res.status(200).send({ message: "Logout Succesfull" });
});

let logoutRouter = router;

module.exports = logoutRouter;
