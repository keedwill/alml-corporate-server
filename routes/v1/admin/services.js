const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Service, Category } = require("../../../models");

const router = Router();

router.get("/services", requireAdmin, async (req, res) => {
  
  try {
    let services = await Service.findAll({
      include: Category,
    });

    if (services.length < 1) {
      res.status(200).send([]);
    } else {
      res.status(200).send(services);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let servicesRouter = router;

module.exports = servicesRouter;
