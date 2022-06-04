const { Router } = require("express");
const { ensureAuth } = require("../../../config/auth");
const { User, Service, Contract, Category } = require("../../../models");
const { serializeContracts } = require("../admin/contracts");
const router = Router();

router.get("/dashboard/contractServices", ensureAuth, async (req, res) => {
  try {
    Contract.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Service,
          attributes: ["name", "description", "fee", "CategoryId"],
          include: {
            model: Category,
          },
        },
      ],
      where: { UserId: req.userId },
    }).then((result) => {
      return res.status(200).send(serializeContracts(result));
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let contractedServicesRouter = router;

module.exports = contractedServicesRouter;
