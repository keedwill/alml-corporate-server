const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Contract, Service } = require("../../../models");

const router = Router();

router.post("/contract/create", requireAdmin, async (req, res) => {
  try {
    let contract = await Contract.findOne({
      where: { UserId: req.body.userId },
    });
    if (contract) {
      return res
        .status(400)
        .send({ message: "Contract Already Exist For This User" });
    } else {
      let createdContract = await Contract.create({
        UserId: req.body["userId"],
        duration: req.body.duration,
      });
      createdContract = await createdContract.save();

      req.body.contract_services.forEach(async (a) => {
        const theService = await Service.findByPk(a.id);

        await createdContract.addService(theService, {
          through: { agreedFee: a.price },
        });
      });

      return res.status(200).send({ message: "Contract Created Succesfully" });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

let createContractRouter = router;

module.exports = createContractRouter;
