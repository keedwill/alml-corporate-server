const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Proforma, User } = require("../../../models");
const router = Router();

router.get("/proformas", requireAdmin, async (req, res) => {
  var errors = [];
  try {
    let proformas = await Proforma.findAll({
      include: {
        model: User,
      },
    });

    if (proformas.length < 1) {
      errors.push({ message: "No Proformas Found" });
    }

    res.status(200).send({ proformas });
  } catch (error) {
    errors.push({ message: error.message });
    res.status(500).send({ errors });
  }
});

let proformaRouter = router;

module.exports = proformaRouter;
