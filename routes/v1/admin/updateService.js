const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Service } = require("../../../models");

const router = Router();

router.patch("/services/edit/:id", requireAdmin, async (req, res) => {
  try {
    let { name, fee, description, status } = req.body;

    let service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).send({ message: "Service Does Not Exist" });
    } else {
      if (name) {
        service.name = name;
      }
      if (fee) {
        service.fee = fee;
      }
      if (description) {
        service.description = description;
      }
      if (status) {
        service.status = status;
      }

      await service.save();
      return res.status(200).send({ message: "Service Updated" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let updateServiceRouter = router;

module.exports = updateServiceRouter;
