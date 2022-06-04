const { Router } = require("express");
const contractedServicesRouter = require("./contractedServices");
const createProformaRouter = require("./createProforma");
const userDashboardRouter = require("./dashboard");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const proformasRouter = require("./proforma");
const registerRouter = require("./register");
const searchProfomaRouter = require("./searchProforma");
const singleProformaRouter = require("./singleProforma");
const updateProfileRouter = require("./updateProfile");
const userProfileRouter = require("./userProfile");

const router = Router();


// User Routes
router.use(loginRouter);
router.use(registerRouter);
router.use(logoutRouter);
router.use(userProfileRouter);
router.use(singleProformaRouter);
router.use(userDashboardRouter);
router.use(proformasRouter);
router.use(createProformaRouter);
router.use(updateProfileRouter);
router.use(searchProfomaRouter);
router.use(contractedServicesRouter);




module.exports = router;