const { Router } = require("express");
const { requireAdmin } = require("../../../config/auth");
const { User } = require("../../../models");
const serializeUser = require("../../../helpers/serializeUser");

const router = Router();

router.get("/companys", requireAdmin, async (req, res) => {
  try {
    let companys = await User.findAll({
      order: [["createdAt", "desc"]],
    });
    res.status(200).send(serializeCompanys(companys));
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

const serializeCompanys = (companys) => {
  return companys.map((company) => {
    return {
      id: company.id,
      name: company.name,
      address: company.address,
      email: company.phone,
      role: company.role,
      status: company.status,
      phone: company.phone,
      image: company.image,
      createdAt: company.createdAt,
    };
  });
};

let companysRouter = router;

module.exports = companysRouter;
