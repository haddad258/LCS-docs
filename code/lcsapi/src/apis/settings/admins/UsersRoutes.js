
const express = require("express");
const UsersController = require("./UsersController");
const authJwt = require("../../../middlewares/authJwt");

const restRouterusers = express.Router();

restRouterusers.post("/",  [authJwt.verifyToken],  UsersController.addUsers);
restRouterusers.put("/:id",  [authJwt.verifyToken],  UsersController.updateUsers);
restRouterusers.get("/",  [authJwt.verifyToken],  UsersController.getAllUserss);
restRouterusers.get("/:id", [authJwt.verifyToken], UsersController.getUsersById);
restRouterusers.put("/update/password/:id",  [authJwt.verifyToken],  UsersController.updateUserPassword);

module.exports = { restRouterusers };
  