
const express = require("express");
const CustomersController = require("./CustomersController");
const authJwt = require("../../../middlewares/authJwt");
const restRoutercustomerImages = express.Router();

restRoutercustomerImages.get("/:id",  [authJwt.verifyToken],  CustomersController.getImagesCustomers);

module.exports = { restRoutercustomerImages };
  