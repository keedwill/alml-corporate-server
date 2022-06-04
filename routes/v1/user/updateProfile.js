const { Router } = require("express");

const { ensureAuth } = require("../../../config/auth");

const { User } = require("../../../models");
const router = Router();

router.post("/profile", ensureAuth, async (req, res) => {
  try {
    let { name, email, address, phone } = req.body;
    let user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    } else {
      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (address) {
        user.address = address;
      }
      if (phone) {
        user.phone = phone;
      }
      await user.save();
      return res.status(200).send({ message: "User Updated Succesfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

let updateProfileRouter = router;

module.exports = updateProfileRouter;
