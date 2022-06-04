const router = require("express").Router();
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const { DataTypes } = require("sequelize");
const db = require("../config/database");
const {User,Admin,Contract,Category,Service,Contract_Service} = require("../models")
// const User = require("../models/user")(db, DataTypes);
// const Service = require("../models/service")(db, DataTypes);

// const Contract = require("../models/contract")(db, DataTypes);
// const Category = require("../models/category")(db, DataTypes);
// const Contract_Service = require("../models/contract_service")(db, DataTypes);

// //category create page
// router.get("/category/create", async (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       res.render("admin/createcategory", {
//         user: req.session.user,
//         layout: "main2",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.redirect("/admin/login");
//   }
// });

//create category
// router.post("/category/create", async (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       let name = req.body.name;
//       let category = await Category.create({ name });

//       let savedCategory = await category.save();
//       if (savedCategory) {
//         req.flash("success_msg", "Category Created");
//         res.redirect("/admin/dashboard");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.redirect("/admin/login");
//   }
// });


router.post("/contract/create", async (req, res) => {
  try {
    if (
      req.session.user.role === "admin" &&
      req.session.user.status === "active" &&
      req.cookies.user_sid
    ) {
      // console.log(req.body.duration)
      let contract = await Contract.findOne({
        where: { UserId: req.body.userId },
      });
      if (contract) {
       // console.log('Contract alraedy exist for specified user')
        res.status(400).render("admin/createcontract");
      } else {
        
         let createdContract = await Contract.create({
        UserId: req.body["userId"],
        duration:req.body.duration
        });
        createdContract  =  await  createdContract.save()
       
        req.body.contract_services.forEach(async (a) => {
          if (typeof a.id === "string") {
            const theService = await Service.findByPk(a.id);
           

            await createdContract.addService(theService, {
              through: { agreedFee: a.agreed_rate },
            });
          }
        });
       
      
        
        res.status(200).render("admin/createcontract");
      }

     
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "Login to View Page");
    res.redirect("/admin/login");
  }
});

//update contracts
router.post("/contract/edit/:id", async (req, res) => {
  if (
    req.session.user.role === "admin" &&
    req.session.user.status === "active" &&
    req.cookies.user_sid
  ) {
    let { agreed_rate, status } = req.body;
    let contract = await Contract.findByPk(req.params.id);
    if (!contract) {
      req.flash("error_msg", "Contract to be Updated Does not Exist");

      res.redirect("/admin/login");
    } else {
      if (agreed_rate) {
        contract.agreed_rate = agreed_rate;
      }

      if (status) {
        contract.status = status;
      }

      contract.save();
      req.flash("success_msg", "Contract Updated");

      res.redirect("/admin/contract/edit/" + contract.id);
    }
  } else {
    req.flash("error_msg", "login to view this page");

    res.redirect("/admin/login");
  }
});

//get all contracts
// router.get("/contracts", async (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       let contracts = await Contract.findAll({
//         include: [
//           {
//             model: Contract_Service,
//           },
//         ],
//       });
//       console.log(contracts);

//       // res.render("admin/contracts", {
//       //   user: req.session.user,
//       //   layout: "main2",
//       //   contracts,
//       // });
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.redirect("/admin/login");
//   }
// });

//page to edit contract
router.get("/contract/edit/:id", async (req, res) => {
  try {
    if (
      req.session.user.role === "admin" &&
      req.session.user.status === "active" &&
      req.cookies.user_sid
    ) {
      let contract = await Contract.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Service,
          },
        ],
        where: { id: req.params.id },
      });
      // console.log(contract)

      if (!contract) {
        req.flash("error_msg", "login to view this page");

        res.redirect("/admin/login");
      }

      res.render("admin/editcontract", {
        layout: "main2",
        user: req.session.user,
        contract,
      });
    } else {
      req.flash("error_msg", "login to view this page");

      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "login to view this page");

    res.redirect("/admin/login");
  }
});

//page to create contracts

router.get("/contract/create", async (req, res) => {
  try {
    if (
      req.session.user.role === "admin" &&
      req.session.user.status === "active" &&
      req.cookies.user_sid
    ) {
      const services = await Service.findAll();
      const users = await User.findAll();
      res.render("admin/createcontract", {
        user: req.session.user,
        layout: "main2",
        services,
        users,
      });
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "Login to View Page");
    res.redirect("/admin/login");
  }
});

// //create contracts
// router.post("", async (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       let { service, user, agreed_rate } = req.body;
//       //console.log(req.body)
//       const services = await Service.findAll();
//       const users = await User.findAll();
//       let errors = [];
//       //check required fields
//       if (!service || !user || !agreed_rate) {
//         errors.push({ message: "Please fill in all fields" });
//       }

//       if (errors.length > 0) {
//         res.render("admin/createcontract", {
//           layout: "main2",
//           user: req.session.user,
//           errors,
//           services,
//           users,
//         });
//       } else {
//         const contract = new Contract({
//           agreed_rate,
//           serviceId: service,
//           userId: user,
//         });
//         contract
//           .save()
//           .then(() => {
//             req.flash("success_msg", "Contract Created Sucessfully");
//             res.redirect("/admin/contract/create");
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.redirect("/admin/login");
//   }
// });

//page to get all proformas
// router.get("/proformas", async (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       let proformas = await Proforma.findAll({
//         include: {
//           model: User,
//         },
//       });

//       res.render("admin/proformas", {
//         user: req.session.user,
//         layout: "main2",
//         proformas,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.redirect("/admin/login");
//   }
// });

//page for editing a company
router.get("/company/edit/:id", async (req, res) => {
  try {
    if (
      req.session.user.role === "admin" &&
      req.session.user.status === "active" &&
      req.cookies.user_sid
    ) {
      let user = await User.findByPk(req.params.id);
      if (!user) {
        req.flash("error_msg", "login to view this page");

        res.redirect("/admin/login");
      }

      res.render("admin/editcompany", {
        layout: "main2",
        user: req.session.user,
        name: user.name,
        email: user.email,
        phone: user.phone,
        id: user.id,
        address: user.address,
        status: user.status,
      });
    } else {
      req.flash("error_msg", "login to view this page");

      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "login to view this page");

    res.redirect("/admin/login");
  }
});

//page for editing a service

router.get("/services/edit/:id", async (req, res) => {
  try {
    if (
      req.session.user.role === "admin" &&
      req.session.user.status === "active" &&
      req.cookies.user_sid
    ) {
      let service = await Service.findByPk(req.params.id);
      if (!service) {
        req.flash("error_msg", "login to view this page");

        res.redirect("/admin/login");
      }

      res.render("admin/editservice", {
        layout: "main2",
        user: req.session.user,
        name: service.name,
        description: service.description,
        fee: service.fee,
        id: service.id,
        status: service.status,
      });
    } else {
      req.flash("error_msg", "login to view this page");

      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "login to view this page");

    res.redirect("/admin/login");
  }
});

//updating a company
router.post("/companys/edit/:id", async (req, res) => {
  try {
    if (
      req.session.user.role === "admin" &&
      req.session.user.status === "active" &&
      req.cookies.user_sid
    ) {
      const { name, email, phone, address, password, password2 } = req.body;
      let errors = [];
      const user = await User.findByPk(req.params.id);
      if (!user) {
        req.flash("error_msg", "User to be Updated Does not Exist");

        res.redirect("/admin/login");
      }

      if (name) {
        user.name = name;
      }
      if (email) {
        user.email = email;
      }
      if (phone) {
        user.phone = phone;
      }
      if (address) {
        user.address = address;
      }
      if (password && password2) {
        //check passwords match
        if (password !== password2) {
          errors.push({ message: "Passwords do not match" });
        }

        if (password.length < 6) {
          errors.push({ message: "Password must be at least 6 characters" });
        }
        user.password = password;
      }

      if (errors.length > 0) {
        res.render("admin/editcompany", {
          user: req.session.user,
          layout: "main2",
          name: user.name,
          email: user.email,
          phone: user.phone,
          id: user.id,
          address: user.address,
          status: user.status,
          errors,
        });
      } else {
        //hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((user) => {
                req.flash("success_msg", "Company Updated Succesfully");
                res.redirect("/admin/company/edit/" + user.id);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
    req.flash("error_msg", "Login to View Page");
    res.redirect("/admin/login");
  }
});

// updating a service
// router.post("/services/edit/:id", async (req, res) => {
//   if (
//     req.session.user.role === "admin" &&
//     req.session.user.status === "active" &&
//     req.cookies.user_sid
//   ) {
//     let { name, fee, description, status } = req.body;
//     let service = await Service.findByPk(req.params.id);
//     if (!service) {
//       req.flash("error_msg", "Service to be Updated Does not Exist");

//       res.redirect("/admin/login");
//     } else {
//       if (name) {
//         service.name = name;
//       }
//       if (fee) {
//         service.fee = fee;
//       }
//       if (description) {
//         service.description = description;
//       }
//       if (status) {
//         service.status = status;
//       }

//       service.save();
//       req.flash("success_msg", "Service Updated");

//       res.redirect("/admin/services/edit/" + service.id);
//     }
//   } else {
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/admin/login");
//   }
// });

// //page to create a service
// router.get("/services/create", async (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       let categorys = await Category.findAll();
//       if (categorys) {
//         res.render("admin/createservice", {
//           user: req.session.user,
//           layout: "main2",
//           categorys,
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.redirect("/admin/login");
//   }
// });

// router.get("/company/create", (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       res.render("admin/createcompany", {
//         user: req.session.user,
//         layout: "main2",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "Login to View Page");
//     res.redirect("/admin/login");
//   }
// });

//get all companys
// router
//   .route("/companys")
//   .get(async (req, res) => {
//     try {
//       if (
//         req.session.user.role === "admin" &&
//         req.session.user.status === "active" &&
//         req.cookies.user_sid
//       ) {
//         let companys = await User.findAll();
//         res.render("admin/companys", {
//           user: req.session.user,
//           layout: "main2",
//           companys,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       req.flash("error_msg", "Login to View Page");
//       res.redirect("/admin/login");
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       if (
//         req.session.user.role === "admin" &&
//         req.session.user.status === "active" &&
//         req.cookies.user_sid
//       ) {
//         const { name, email, phone, address, password, password2 } = req.body;
//         let errors = [];

//         //check required fields
//         if (!name || !email || !phone || !address || !password || !password2) {
//           errors.push({ message: "Please fill in all fields" });
//         }
//         //check passwords match
//         if (password !== password2) {
//           errors.push({ message: "Passwords do not match" });
//         }

//         if (password.length < 6) {
//           errors.push({ message: "Password must be at least 6 characters" });
//         }

//         let user = await User.findOne({ where: { email } });

//         if (user) {
//           errors.push({ message: "User With That Email Already Exist" });
//         }
//         if (errors.length > 0) {
//           res.render("admin/createcompany", {
//             user: req.session.user,
//             layout: "main2",
//             errors,
//           });
//         } else {
//           const user = new User({
//             name,
//             email,
//             address,
//             phone,
//             password,
//           });
//           //hash the password
//           bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(user.password, salt, (err, hash) => {
//               if (err) throw err;
//               user.password = hash;
//               user
//                 .save()
//                 .then((user) => {
//                   req.flash("success_msg", "Company Created Succesfully");
//                   res.redirect("/admin/company/create");
//                 })
//                 .catch((err) => {
//                   console.log(err);
//                 });
//             });
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       req.flash("error_msg", "Login to View Page");
//       res.redirect("/admin/login");
//     }
//   });


// router.get('/api/services',async (req, res) => {
//   try {
  
//       let services = await Service.findAll();
//       res.status(200).send(services)
    
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error)
//   }
// })


// router
//   .route("/services")

//   .get(async (req, res) => {
//     try {
//       if (
//         req.session.user.role === "admin" &&
//         req.session.user.status === "active" &&
//         req.cookies.user_sid
//       ) {
//         let services = await Service.findAll();
        
//         res.render("admin/services", {
//           user: req.session.user,
//           layout: "main2",
//           services
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       req.flash("error_msg", "Login to View Page");
//       res.redirect("/admin/login");
//     }
//   })
//   .post(async (req, res) => {
//     try {
//       if (
//         req.session.user.role === "admin" &&
//         req.session.user.status === "active" &&
//         req.cookies.user_sid
//       ) {
     
//         let { name, description, fee, id } = req.body;
//         let category = await Category.findByPk(id);
//        // console.log(category)
//         if (category) {
//           let service = new Service({
//             name:name,
//             description:description,
//             fee:fee,
            
//       CategoryId:id,
    
//           });
//           //console.log(service)
          
          
         
//           await service.save();
//           req.flash("success_msg", "Service Saved");
//           res.redirect("/admin/dashboard");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       req.flash("error_msg", "Login to View Page");
//       res.redirect("/admin/login");
//     }
//   });

//admin dashboard
// router.get("/dashboard", (req, res) => {
  
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       // console.log(req.cookies.user_sid);
//       // console.log(req.session.user);
//       // console.log(req.session.user.role);
//       // console.log(req.session.user.status);
//       res.render("admin/dashboard", {
//         layout: "main2",
//         user: req.session.user,
//       });
//     } else {
//       req.flash("error_msg", "login to view this page");

//       res.redirect("/admin/login");
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/admin/login");
//   }
// });

//login admin routes
// router
//   .route("/login")
//   .get((req, res) => {
//     res.render("admin/login");
//   })
//   .post((req, res) => {
//     let { email, password } = req.body;
//     Admin.findOne({ where: { email } })
//       .then((user) => {
//         // || user.status !== "active"
//         if (!user || user.status !== "active") {
//           req.flash("error_msg", "Admin Does not exist");
//           return res.redirect("/admin/login");
//         }

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) console.log(err);

//           if (isMatch) {
//             req.flash("success_msg", "Login Succesfull");
//             req.session.user = user.dataValues;
//             res.redirect("/admin/dashboard");
//           } else {
//             req.flash("error_msg", "Password is incorrect");
//             res.redirect("/admin/login");
//           }
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.redirect("/admin/login");
//       });
//   });

//register admin routes
// router
//   .route("/register")
//   .get((req, res) => {
//     res.render("admin/register");
//   })
//   .post(async (req, res) => {
//     const { email, password, password2 } = req.body;
//     let errors = [];

//     //check required fields
//     if (!email || !password || !password2) {
//       errors.push({ message: "Please fill in all fields" });
//     }

//     //check passwords match
//     if (password !== password2) {
//       errors.push({ message: "Passwords do not match" });
//     }

//     if (password.length < 6) {
//       errors.push({ message: "Password must be at least 6 characters" });
//     }

//     let admin = await Admin.findOne({ where: { email } });

//     if (admin) {
//       errors.push({ message: "User With That Email Already Exist" });
//     }
//     if (errors.length > 0) {
//       res.render("admin/register", { errors });
//     } else {
//       const admin = new Admin({
//         email,
//         status:'active',
//         password,
//       });

//       //hash the password
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(admin.password, salt, (err, hash) => {
//           if (err) throw err;
//           admin.password = hash;
//           admin
//             .save()
//             .then((user) => {
//               req.flash("success_msg", "you can now login");
//               res.redirect("/admin/login");
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         });
//       });
//     }
//   });

// admin profile page
// router.get("/dashboard/profile", async (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       let user = await Admin.findByPk(req.session.user.id);
//       if (!user) {
//         req.flash("error_msg", "login to view this page");

//         res.redirect("/admin/login");
//       }

//       res.render("admin/account", {
//         layout: "main2",
//         user,

//         email: user.email,
//       });
//     } else {
//       req.flash("error_msg", "login to view this page");

//       res.redirect("/admin/login");
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "login to view this page");

//     res.redirect("/admin/login");
//   }
// });

//logout admin
// router.get("/logout", (req, res) => {
//   try {
//     if (
//       req.session.user.role === "admin" &&
//       req.session.user.status === "active" &&
//       req.cookies.user_sid
//     ) {
//       res.clearCookie("user_sid");
//       delete req.session.user;

//       req.flash("success_msg", "You are logged out");
//       res.redirect("/admin/login");
//     } else {
//       res.redirect("/admin/login");
//     }
//   } catch (error) {
//     console.log(error);
//     req.flash("error_msg", "login to view this page");
//     res.redirect("/admin/login");
//   }
// });

//update admin profile

router.post("/profile", async (req, res) => {
  if (
    req.session.user.role === "admin" &&
    req.session.user.status === "active" &&
    req.cookies.user_sid
  ) {
    let { email } = req.body;
    let user = await Admin.findByPk(req.session.user.id);
    if (!user) {
      req.flash("error_msg", "User to be Updated Does not Exist");

      res.redirect("/admin/login");
    } else {
      if (email) {
        user.email = email;
      }

      user.save();
      req.flash("success_msg", "Profile Updated");

      res.redirect("/admin/dashboard/profile");
    }
  } else {
    req.flash("error_msg", "login to view this page");

    res.redirect("/admin/login");
  }
});

module.exports = router;
