const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Service } = require("../../../models");

const router = Router();
router.put("/services/delete/:id", requireAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    let service = await Service.findByPk(id);
    if (!service) {
      return res
        .status(404)
        .send({ message: `Service with id ${id} Does Not Exist` });
    }
    service.status = 'inactive'
    service.save()
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

let deleteServiceRouter = router;

module.exports = deleteServiceRouter;
