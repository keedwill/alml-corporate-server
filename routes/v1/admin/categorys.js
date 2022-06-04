const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Category } = require("../../../models");

const router = Router();

router.get("/categorys", requireAdmin, async (req, res) => {
  try {
    let categorys = await Category.findAll();

    if (categorys.length < 1) {
      res.status(404).send({ message: "No Category Found" });
    } else {
      res.status(200).send( categorys );
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let categorysRouter = router;

module.exports = categorysRouter;
