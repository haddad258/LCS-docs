
const express = require("express");
const CustomersController = require("./CustomersController");
const authJwt = require("../../middlewares/authJwt");

const restRoutercustomers = express.Router();

restRoutercustomers.post("/", CustomersController.addCustomers);
restRoutercustomers.post("/login", CustomersController.LoginAPICustomers);
restRoutercustomers.put("/:id", [authJwt.verifyToken],  CustomersController.updateCustomers);
restRoutercustomers.get("/:id", [authJwt.verifyToken],  CustomersController.getCustomersById);

module.exports = { restRoutercustomers };
  