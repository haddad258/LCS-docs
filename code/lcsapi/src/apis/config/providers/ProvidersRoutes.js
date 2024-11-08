
const express = require("express");
const ProvidersController = require("./ProvidersController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterproviders = express.Router();

restRouterproviders.post("/", [authJwt.verifyToken],  ProvidersController.addProviders);
restRouterproviders.put("/:id", [authJwt.verifyToken],  ProvidersController.updateProviders);
restRouterproviders.get("/", [authJwt.verifyToken],  ProvidersController.getAllProviders);
restRouterproviders.get("/:id",[authJwt.verifyToken],  ProvidersController.getProvidersById);
restRouterproviders.put("/update/password/:id",  [authJwt.verifyToken],  ProvidersController.updateUserPassword);

module.exports = { restRouterproviders };
  