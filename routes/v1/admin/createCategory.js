const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Category } = require("../../../models");

const router = Router();

router.post("/category/create", requireAdmin, async (req, res) => {
  const name = req.body.name;
  const image = req.body.image;

  try {
    if (!name) {
      return res
        .status(400)
        .send({ message: "Category Name Field is Required" });
    }
    if (!image) {
      return res.status(400).send({ message: "Image Field is Required" });
    }
    let category = await Category.create({ name, image });

    let savedCategory = await category.save();
    if (savedCategory) {
      return res.status(200).send({ message: "Category Created Succesfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let createCategoryRouter = router;

module.exports = createCategoryRouter;
