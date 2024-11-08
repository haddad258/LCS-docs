
const express = require("express");
const PaymentCardController = require("./PaymentCardController");
const authJwt = require("../../../../middlewares/authJwt");
const restRouterpaymentcards = express.Router();

restRouterpaymentcards.post("/", [authJwt.verifyToken],  PaymentCardController.addPaymentCard);
restRouterpaymentcards.put("/:id", [authJwt.verifyToken],  PaymentCardController.updatePaymentCard);
restRouterpaymentcards.get("/", [authJwt.verifyToken],  PaymentCardController.getAllPaymentCards);
restRouterpaymentcards.get("/:id", [authJwt.verifyToken],  PaymentCardController.getPaymentCardById);

module.exports = { restRouterpaymentcards };
  