const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Service, Category } = require("../../../models");

const router = Router();
router.post("/services", requireAdmin, async (req, res) => {
  try {
    let { name, description, fee, categoryId,  } = req.body;
    let category = await Category.findByPk(categoryId);

    if (category) {
      let service = new Service({
        name,
        description,
        fee,

        CategoryId: categoryId,
       
      });

      await service.save();
      res.status(200).send({ message: "Service Created Succesfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let createServiceRouter = router;

module.exports = createServiceRouter;
