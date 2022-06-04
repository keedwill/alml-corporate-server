const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { Contract, User, Service, Category } = require("../../../models");

const router = Router();

router.get("/contracts", requireAdmin, async (req, res) => {
  try {
    let contracts = await Contract.findAll({
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
      order: [["createdAt", "desc"]],
    });

    if (contracts.length < 1) {
      res.status(404).send({ message: "No Contracts Available" });
    }

    res.status(200).send(serializeContracts(contracts));
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: error });
  }
});

let contractsRouter = router;

 function serializeContracts(contracts) {
  return contracts.map((contract) => {
    return {
      id: contract.id,
      status: contract.status,
      duration: contract.duration,
      createdAt: contract.createdAt,
      updatedAt: contract.updatedAt,
      user: {
        name: contract.User.name,
        email: contract.User.email,
        address:contract.User.address
      },
      services: contract.Services.map((service) => {
        return {
          name: service.name,
          description: service.description,
          initialFee: service.fee,
          category: {
            name: service.Category.name,
            image: service.Category.image,
          },
          agreedFee: service.Contract_Service.agreedFee,
        };
      }),
    };
  });
}

module.exports = {contractsRouter,serializeContracts};
