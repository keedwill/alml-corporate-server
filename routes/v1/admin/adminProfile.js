const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const serializeUser = require("../../../helpers/serializeUser");

const router = Router();

router.get("/dashboard/profile", requireAdmin, async (req, res) => {
  var errors = [];
  try {
    let user = await Admin.findByPk(req.session.user.id);
    if (!user) {
      errors.push({ message: "User Does Not exist" });

      res.status(404).send({ errors });
    }

    res.status(200).send(serializeUser(user));
  } catch (error) {
    errors.push({ message: error.message });
    res.status(500).send({ errors });
  }
});

let adminProfileRouter = router;

module.exports = adminProfileRouter;
