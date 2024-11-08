
const express = require("express");
const CustomerOrdersController = require("./CustomerOrdersController");
const authJwt = require("../../../middlewares/authCustomer");
const restRouterorders = express.Router();

restRouterorders.post("/", [authJwt.verifyToken],  CustomerOrdersController.addCustomerOrders);
restRouterorders.put("/:id", [authJwt.verifyToken],  CustomerOrdersController.updateCustomerOrders);
restRouterorders.get("/", [authJwt.verifyToken],  CustomerOrdersController.getAllCustomerOrderss);
restRouterorders.get("/:id", [authJwt.verifyToken],  CustomerOrdersController.getCustomerOrdersById);

module.exports = { restRouterorders };
  