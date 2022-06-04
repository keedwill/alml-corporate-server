const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Service } = require("../../../models");

const router = Router();

router.get("/services/:id", async (req, res) => {
  
  try {
    let id = req.params.id;
    let service = await Service.findByPk(id);
    
    if (!service) {
      res.status(404).send({ message: `Service with Id ${id} does not exist ` });
    }

    res.status(200).send(service);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let singleServiceRouter = router;

module.exports = singleServiceRouter;
