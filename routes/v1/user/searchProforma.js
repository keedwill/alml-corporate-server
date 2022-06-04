const { Router } = require("express");

const { ensureAuth } = require("../../../config/auth");

const { Proforma, User } = require("../../../models");
const router = Router();

router.get("/search/proforma", ensureAuth, async (req, res) => {
  let value = req.query.s.toLowerCase();

  try {
    const proformaId = value;

    const proformas = await Proforma.findAll({
      include: User,
      where: {
        id: { [Op.iLike]: "%" + proformaId + "%" },
      },
    });
    if (proformas.length > 0) {
      res.status(200).json(proformas);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let searchProfomaRouter = router;

module.exports = searchProfomaRouter;
