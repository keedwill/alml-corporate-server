const { Router } = require("express");

const { ensureAuth } = require("../../../config/auth");

const { Proforma, Service } = require("../../../models");
const router = Router();

router.post("/proforma/create", ensureAuth, async (req, res) => {
  try {
    let totalPrice = 0;
    req.body.proforma_services.map((price) => {
      totalPrice += parseInt(price.agreedFee);
      return totalPrice;
    });

    let createdProforma = await Proforma.create({
      UserId: req.session.user.id,
      totalAmount: totalPrice,
      bookingEmail: req.body.bookingEmail,
    });
    createdProforma = await createdProforma.save();

    if (createdProforma) {
      req.body.proforma_services.forEach(async (a) => {
        if (typeof a.ServiceId === "string") {
          const theService = await Service.findByPk(a.ServiceId);

          await createdProforma.addService(theService, {
            through: { agreedFee: a.agreedFee },
          });
        }
      });
      return res.status(200).send({ message: "Proforma Created Succesfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let createProformaRouter = router;

module.exports = createProformaRouter;
