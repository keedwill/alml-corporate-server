const { Router } = require("express");
const categorysRouter = require("./categorys");
const companysRouter = require("./companys");
const createCategoryRouter = require("./createCategory");
const createcompany = require("./createCompanys");
const createServiceRouter = require("./createService");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const proformaRouter = require("./proformas");
const registerRouter = require("./register");
const servicesRouter = require("./services");
const updateServiceRouter = require("./updateService");
const {contractsRouter} = require("./contracts");
const servicesByCategoryRouter = require("./servicesByCategory");
const singleServiceRouter = require("./singleService");
const deleteServiceRouter = require("./deleteService");
const createContractRouter = require("./createContract");
const servicesBySearchRouter = require("./servicesBySerach");


const router = Router();

//admin routes
router.use(createCategoryRouter);
router.use(logoutRouter);
router.use(registerRouter);
router.use(loginRouter);
router.use(servicesRouter);
router.use(createServiceRouter);
router.use(companysRouter);
router.use(createcompany);
router.use(updateServiceRouter);
router.use(proformaRouter);
router.use(categorysRouter);
router.use(contractsRouter);
router.use(servicesByCategoryRouter);
router.use(singleServiceRouter);
router.use(deleteServiceRouter);
router.use(createContractRouter);
router.use(servicesBySearchRouter);


module.exports = router;
