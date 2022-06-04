const { Router } = require("express");
const { ensureAuth } = require("../../../config/auth");
const { User, Service, Proforma, Category } = require("../../../models");
const router = Router();

router.get("/proforma", ensureAuth, async (req, res) => {
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const size = 3;
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    const proformas = await Proforma.findAndCountAll({
      include: [
        {
          model: User,
        },
        {
          model: Service,
          include: Category,
        },
      ],
      where: { UserId: req.userId },
      limit: size,
      offset: page * size,
      distinct: true,
    });
    if (proformas.length < 1) {
      return res.status(200).send([]);
    }
    return res.status(200).send({
      data: proformas.rows,
      totalPages: Math.ceil(proformas.count / size),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

let proformasRouter = router;

module.exports = proformasRouter;
