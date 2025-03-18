const merchantController = require("../controllers/merchantController");
const express = require("express");

const router = express.Router();

router.post("/register", merchantController.merchantRegister);
router.post("/login", merchantController.merchantLogin);
router.get("/all-merchants", merchantController.getAllMerchants);
router.get("/single-merchant/:id", merchantController.getMerchantById);

module.exports = router;
