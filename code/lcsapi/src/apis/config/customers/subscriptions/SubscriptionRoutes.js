
const express = require("express");
const SubscriptionController = require("./SubscriptionController");
const authJwt = require("../../../../middlewares/authJwt");
const restRoutersubscriptions = express.Router();

restRoutersubscriptions.post("/", [authJwt.verifyToken],  SubscriptionController.addSubscription);
restRoutersubscriptions.put("/:id", [authJwt.verifyToken],  SubscriptionController.updateSubscription);
restRoutersubscriptions.get("/", [authJwt.verifyToken],  SubscriptionController.getAllSubscriptions);
restRoutersubscriptions.get("/:id", [authJwt.verifyToken],  SubscriptionController.getSubscriptionById);

module.exports = { restRoutersubscriptions };
  