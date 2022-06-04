const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Service, Category } = require("../../../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const router = Router();

router.get("/search/service", requireAdmin, async (req, res) => {
  let value = req.query.s.toLowerCase();

  try {
    const serviceName = value;

    const services = await Service.findAll({
      include: Category,
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: "%" + serviceName + "%" } },
          { description: { [Op.iLike]: "%" + serviceName + "%" } },
        ],
      },
    });
    if (services.length > 0) {
      res.status(200).json(services);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let servicesBySearchRouter = router;

module.exports = servicesBySearchRouter;
