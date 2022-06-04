const { Router } = require("express");
const { ensureAuth } = require("../../../config/auth");
const { User, Service, Category, Contract } = require("../../../models");
const router = Router();

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const contractedSevices = await Contract.findAll({
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
    });
    if (contractedSevices.length < 1) {
      return res
        .status(200)
        .send([]);
    }
    return res.status(200).send(contractedSevices);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let userDashboardRouter = router;

module.exports = userDashboardRouter;
