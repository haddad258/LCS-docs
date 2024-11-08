
const express = require("express");
const StatusOrdersController = require("./StatusOrdersController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterstatusorders = express.Router();

restRouterstatusorders.post("/", [authJwt.verifyToken],  StatusOrdersController.addStatusOrders);
restRouterstatusorders.put("/:id", [authJwt.verifyToken],  StatusOrdersController.updateStatusOrders);
restRouterstatusorders.get("/", [authJwt.verifyToken],  StatusOrdersController.getAllStatusOrderss);
restRouterstatusorders.get("/:id", [authJwt.verifyToken],  StatusOrdersController.getStatusOrdersById);

module.exports = { restRouterstatusorders };
  