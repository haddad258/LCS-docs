
const express = require("express");
const CustomersController = require("./CustomersController");
const authJwt = require("../../../middlewares/authJwt");
const restRoutercustomers = express.Router();

restRoutercustomers.post("/", [authJwt.verifyToken],  CustomersController.addCustomers);
restRoutercustomers.put("/:id", [authJwt.verifyToken],  CustomersController.updateCustomers);
restRoutercustomers.get("/", [authJwt.verifyToken],  CustomersController.getAllCustomers);
restRoutercustomers.get("/:id",[authJwt.verifyToken],  CustomersController.getCustomersById);
restRoutercustomers.put("/update/password/:id",  [authJwt.verifyToken],  CustomersController.updateUserPassword);

module.exports = { restRoutercustomers };
  