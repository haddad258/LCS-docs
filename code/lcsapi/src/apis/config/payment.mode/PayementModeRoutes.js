
const express = require("express");
const PaymentModeController = require("./PaymentModeController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterpaymentmode = express.Router();

restRouterpaymentmode.post("/", [authJwt.verifyToken],  PaymentModeController.addPaymentMode);
restRouterpaymentmode.put("/:id", [authJwt.verifyToken],  PaymentModeController.updatePaymentMode);
restRouterpaymentmode.get("/", [authJwt.verifyToken],  PaymentModeController.getAllPaymentModes);
restRouterpaymentmode.get("/:id", [authJwt.verifyToken],  PaymentModeController.getPaymentModeById);

module.exports = { restRouterpaymentmode };
  