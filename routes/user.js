const router = require("express").Router();
const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const db = require("../config/database");
const {
  User,
  Admin,
  Contract,
  Category,
  Service,
  Contract_Service,
  Proforma,
} = require("../models");
//const Proforma = require("../models/proforma");
// const Service = require("../models/service");
// const Contract = require("../models/contract");
const sequelize = require("sequelize");
const { ensureAuth } = require("../config/auth");
const Op = sequelize.Op;



// router.post("/dashboard/proforma/create", async (req, res) => {
//   try {
//     if (req.session.user && req.cookies.user_sid) {
//       // console.log(req.body)
//       let totalPrice = 0;
//       req.body.proforma_services.map((price) => {
//         totalPrice += parseInt(price.agreedFee);
//         return totalPrice;
//       });

//       let createdProforma = await Proforma.create({
//         UserId: req.session.user.id,
//         totalAmount: totalPrice,
//         bookingEmail: req.body.bookingEmail,
//       });
//       createdProforma = await createdProforma.save();
//       // console.log(createdProforma)
//       if (createdProforma) {
//         req.body.proforma_services.forEach(async (a) => {
//           if (typeof a.ServiceId === "string") {
//             const theService = await Service.findByPk(a.ServiceId);

//             await createdProforma.addService(theService, {
//               through: { agreedFee: a.agreedFee },
//             });
//           }
//         });
//         res.status(200).render("dashboard", { layout: "main1" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.status(500).redirect("/");
//   }
// });



// router.get("/dashboard/proforma/:id", async (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     let id = req.params.id;
//     Proforma.findAll({
//       include: [
//         {
//           model: User,
//         },
//         {
//           model: Service,
//         },
//       ],
//       where: { id: id },
//     }).then((proforma) => {
//       //console.log(proforma)
//       res.render("singleproforma", {
//         layout: "main1",
//         proforma,
//         user: req.session.user,
//       });
//     });
//     // const proforma = await Proforma.findByPk(id);
//   } else {
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/");
//   }
// });

router.post("/dashboard/proforma/edit/:id", async (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    let id = req.params.id;
    const proforma = await Proforma.findByPk(id);
    let { number_of_individuals, description, total_amount } = req.body;
    if (number_of_individuals) {
      proforma.number_of_individuals = number_of_individuals;
    }
    if (description) {
      proforma.description = description;
    }
    if (total_amount) {
      proforma.total_amount = total_amount;
    }

    proforma.save().then((proforma) => {
      req.flash("success_msg", "Proforma Updated");

      res.redirect("/dashboard/proforma/edit/" + proforma.id);
    });
  } else {
    req.flash("error_msg", "login to view this page");

    res.redirect("/");
  }
});

// router.get("/dashboard", ensureAuth, async (req, res) => {
  
//     Contract.findAll({
//       include: [
//         {
//           model: User,
//         },
//         {
//           model: Service,
//           attributes: ["name", "description", "fee", "CategoryId"],
//           include: {
//             model: Category,
//           },
//         },
//       ],
//       where: { UserId: req.session.user.id },
//     }).then((result) => {
//       //  console.log(result)
//       // result.map(a=>{
//       //   // console.log(a.dataValues)
//       //   a.dataValues.Services.map(b=>{
//       //    console.log(b)
//       //     // console.log(b.name)
//       //     // console.log(b.fee)
//       //     // console.log(b.description)
//       //     // console.log(b.Contract_Service.agreedFee)
//       //   })
//       // })

//       res.render("dashboard", {
//         layout: "main1",
//         result,
//         user: req.session.user,
//         title: "Dashboard",
//       });
//     });
  
// });

// //API for contracted services for a specified user
// router.get("/api/dashboard/contract", async (req, res) => {
//   try {
//     Contract.findAll({
//       include: [
//         {
//           model: User,
//         },
//         {
//           model: Service,
//           attributes: ["name", "description", "fee", "CategoryId"],
//           include: {
//             model: Category,
//           },
//         },
//       ],
//       where: { UserId: req.session.user.id },
//     }).then((result) => {
//       // console.log(result)
//       result.map((a) => {
//         //  console.log(a.dataValues)
//         a.dataValues.Services.map((b) => {
//           // console.log(b)
//           // console.log(b.name)
//           // console.log(b.fee)
//           // console.log(b.description)
//           // console.log(b.Contract_Service.agreedFee)
//           console.log(b.Category);
//         });
//       });

//       res.status(200).send(result);
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

// router.get("/dashboard/contract", async (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     Contract.findAll({
//       include: [
//         {
//           model: User,
//         },
//         {
//           model: Service,
//           attributes: ["name", "description", "fee"],
//         },
//       ],
//       where: { UserId: req.session.user.id },
//     }).then((result) => {
//       //  console.log(result)
//       // result.map(a=>{
//       //   // console.log(a.dataValues)
//       //   a.dataValues.Services.map(b=>{
//       //    /// console.log(b)
//       //     console.log(b.name)
//       //     console.log(b.fee)
//       //     console.log(b.description)
//       //     console.log(b.Contract_Service.agreedFee)
//       //   })
//       // })

//       res.render("contract", {
//         layout: "main1",
//         result,
//         user: req.session.user,
//         title: "Contract",
//       });
//     });

//     // console.log(proforma)
//   } else {
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/");
//   }
// });

// router.get("/dashboard/proforma", async (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     Proforma.findAll({
//       include: [
//         {
//           model: User,
//         },
//         {
//           model: Service,
//         },
//       ],
//       where: { UserId: req.session.user.id },
//     }).then((result) => {
//       // result.map(a=>{
//       //   // console.log(a.dataValues)
//       //   a.dataValues.Services.map(b=>{
//       //   // console.log(b)
//       //     console.log(b.name)
//       //     console.log(b.fee)
//       //      console.log(b.description)
//       //     // console.log(b.Proforma_Service.agreedFee)
//       //   })
//       // })
//       res.render("proforma", {
//         layout: "main1",
//         result,
//         user: req.session.user,
//         title: "Proforma",
//       });
//       // console.log(result)
//     });

//     // console.log(proforma)
//   } else {
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/");
//   }
// });

// delete a proforma
router.get("/dashboard/proforma/delete/:id", async (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    let id = req.params.id;
    const proforma = await Proforma.findByPk(id);
    if (!proforma) {
      req.flash("error_msg", "Proforma to  be deleted does not exist");

      res.redirect("/dashboard/proforma");
    } else {
      proforma.state = "inactive";
      proforma.save();
      req.flash("success_msg", "Proforma deleted Succesfully");

      res.redirect("/dashboard/proforma");
    }
  } else {
    req.flash("error_msg", "login to view this page");

    res.redirect("/");
  }
});

router.get("/dashboard/proforma/edit/:id", async (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    let id = req.params.id;
    const proforma = await Proforma.findByPk(id);

    res.render("editproforma", {
      layout: "main1",
      proforma,
      user: req.session.user,
    });
  } else {
    req.flash("error_msg", "login to view this page");

    res.redirect("/");
  }
});

// router.get("/dashboard/profile", async (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     let user = await User.findByPk(req.session.user.id);
//     if (!user) {
//       req.flash("error_msg", "login to view this page");

//       res.redirect("/");
//     }

//     res.render("account", {
//       layout: "main1",
//       user,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       phone: user.phone,
//     });
//   } else {
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/");
//   }
// });

// router.post("/profile", async (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     let { name, email, address, phone } = req.body;
//     let user = await User.findByPk(req.session.user.id);
//     if (!user) {
//       req.flash("error_msg", "User to be Updated Does not Exist");

//       res.redirect("/");
//     } else {
//       if (name) {
//         user.name = name;
//       }
//       if (email) {
//         user.email = email;
//       }
//       if (address) {
//         user.address = address;
//       }
//       if (phone) {
//         user.phone = phone;
//       }
//       user.save();
//       req.flash("success_msg", "Profile Updated");

//       res.redirect("/dashboard/profile");
//     }
//   } else {
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/");
//   }
// });

// router.post("/login", (req, res) => {
//   let { email, password } = req.body;
//   User.findOne({ where: { email } })
//     .then((user) => {
//       if (!user) {
//         req.flash("error_msg", "User Does not exist");
//         res.redirect("/");
//       }
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) console.log(err);

//         if (isMatch) {
//           req.flash("success_msg", "Login Succesfull");
//           const { id, name, email, role } = user.dataValues;

//           req.session.user = { id, name, email, role };
//           res.redirect("/dashboard");
//         } else {
//           req.flash("error_msg", "Password is incorrect");
//           res.redirect("/");
//         }
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.post("/register", async (req, res) => {
//   const { name, email, phone, address, password, password2 } = req.body;
//   let errors = [];

//   //check required fields
//   if (!name || !email || !phone || !address || !password || !password2) {
//     errors.push({ message: "Please fill in all fields" });
//   }

//   //check passwords match
//   if (password !== password2) {
//     errors.push({ message: "Passwords do not match" });
//   }

//   if (password.length < 6) {
//     errors.push({ message: "Password must be at least 6 characters" });
//   }

//   let user = await User.findOne({ where: { email } });

//   if (user) {
//     errors.push({ message: "User With That Email Already Exist" });
//   }
//   if (errors.length > 0) {
//     res.render("register", { errors });
//   } else {
//     const user = new User({
//       name,
//       email,
//       address,
//       phone,
//       password,
//     });

//     //hash the password
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         if (err) throw err;
//         user.password = hash;
//         user
//           .save()
//           .then((user) => {
//             req.flash("success_msg", "you can now login");
//             res.redirect("/");
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       });
//     });
//   }
// });

// router.get("/logout", (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     res.clearCookie("user_sid");
//     delete req.session.user;

//     req.flash("success_msg", "You are logged out");
//     res.redirect("/");
//   } else {
//     res.redirect("/");
//   }
// });

// router.get("/search", (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     const { term } = req.query;
//     // console.log(term)
//     Proforma.findAll({
//       where: sequelize.where(sequelize.cast(sequelize.col("id"), "varchar"), {
//         [Op.like]: `%${term}%`,
//       }),
//     })
//       //  Proforma.findAll({where:{  id:{  [Op.contains]:'%' + term + '%'}}})
//       .then((proforma) => {
//         // console.log(proforma)
//         res.render("result", { proforma, layout: "main1" });
//       })
//       .catch((err) => console.log(err));
//   } else {
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/");
//   }
// });

//flutterwave webhooks route
router.post("/verify-payment", (req, res) => {
  console.log(req.body.data);
});
// router.get("*", (req, res) => {
//   res.render("error");
// });

module.exports = router;
