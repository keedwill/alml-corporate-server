const { Router } = require("express");

const { ensureAuth } = require("../../../config/auth");
const serializeUser = require("../../../helpers/serializeUser");
const { User } = require("../../../models");
const router = Router();

router.get("/dashboard/profile", ensureAuth, async (req, res) => {
  try {
    let user = await User.findByPk(req.userId);
    if (!user) {
      res.status(404).send({ message: "User Does Not Exist" });
    }
    return res.status(200).send(serializeUser(user));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

let userProfileRouter = router;

module.exports = userProfileRouter;
