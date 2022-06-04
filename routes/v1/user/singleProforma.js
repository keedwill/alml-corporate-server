const { Router } = require("express");
const { ensureAuth } = require("../../../config/auth");
const { User, Service, Proforma } = require("../../../models");
const router = Router();

router.get("/proforma/:id", ensureAuth, async (req, res) => {
  let id = req.params.id;
  try {
    const proforma = await Proforma.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Service,
        },
      ],
      where: { id: id },
    });
    if (proforma.length < 1) {
      return res.status(200).send([]);
    }
    res.status(200).send(proforma);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

let singleProformaRouter = router;

module.exports = singleProformaRouter;
