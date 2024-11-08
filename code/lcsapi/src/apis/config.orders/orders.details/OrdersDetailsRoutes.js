
const express = require("express");
const OrdersDetailsController = require("./OrdersDetailsController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterordersdetails = express.Router();

restRouterordersdetails.post("/", [authJwt.verifyToken],  OrdersDetailsController.addOrdersDetails);
restRouterordersdetails.put("/:id", [authJwt.verifyToken],  OrdersDetailsController.updateOrdersDetails);
restRouterordersdetails.get("/", [authJwt.verifyToken],  OrdersDetailsController.getAllOrdersDetailss);
restRouterordersdetails.get("/:id", [authJwt.verifyToken],  OrdersDetailsController.getOrdersDetailsById);

module.exports = { restRouterordersdetails };
  