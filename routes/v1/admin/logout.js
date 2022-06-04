const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");

const router = Router();

router.get("/logout", requireAdmin, (req, res) => {
  res.clearCookie("user_sid");
  delete req.session.user;

  res.status(200).send({ message: "Logout Succesfull" });
});

let logoutRouter = router;

module.exports = logoutRouter;
