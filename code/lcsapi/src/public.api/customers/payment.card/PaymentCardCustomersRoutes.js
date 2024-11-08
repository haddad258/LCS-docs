
const express = require("express");
const PaymentCardCustomersController = require("./PaymentCardCustomersController");
const authJwt = require("../../../middlewares/authCustomer");
const restRouterpaymentcards = express.Router();

restRouterpaymentcards.post("/", [authJwt.verifyToken],  PaymentCardCustomersController.addPaymentCardCustomers);
restRouterpaymentcards.put("/:id", [authJwt.verifyToken],  PaymentCardCustomersController.updatePaymentCardCustomers);
restRouterpaymentcards.get("/", [authJwt.verifyToken],  PaymentCardCustomersController.getAllPaymentCardCustomerss);
restRouterpaymentcards.get("/:id", [authJwt.verifyToken],  PaymentCardCustomersController.getPaymentCardCustomersById);

module.exports = { restRouterpaymentcards };
  