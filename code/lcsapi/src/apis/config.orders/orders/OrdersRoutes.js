
const express = require("express");
const OrdersController = require("./OrdersController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterorders = express.Router();

restRouterorders.post("/", [authJwt.verifyToken],  OrdersController.addOrders);
restRouterorders.put("/:id", [authJwt.verifyToken],  OrdersController.updateOrders);
restRouterorders.get("/", [authJwt.verifyToken],  OrdersController.getAllOrderss);
restRouterorders.get("/:id", [authJwt.verifyToken],  OrdersController.getOrdersById);

module.exports = { restRouterorders };
  