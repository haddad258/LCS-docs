
const express = require("express");
const SubscriptionsCustomerController = require("./SubscriptionsCustomerController");
const authJwt = require("../../../middlewares/authCustomer");
const restRoutersubscriptions = express.Router();

restRoutersubscriptions.post("/", [authJwt.verifyToken],  SubscriptionsCustomerController.addSubscriptionsCustomer);
restRoutersubscriptions.put("/:id", [authJwt.verifyToken],  SubscriptionsCustomerController.updateSubscriptionsCustomer);
restRoutersubscriptions.get("/", [authJwt.verifyToken],  SubscriptionsCustomerController.getAllSubscriptionsCustomers);
restRoutersubscriptions.get("/:id", [authJwt.verifyToken],  SubscriptionsCustomerController.getSubscriptionsCustomerById);

module.exports = { restRoutersubscriptions };
  