
const express = require("express");
const ConfigAppsController = require("./ConfigAppsController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterconfigApp = express.Router();

restRouterconfigApp.post("/entity/:entity", [authJwt.verifyToken],  ConfigAppsController.addConfigApps);
restRouterconfigApp.put("/entity/:entity/:id", [authJwt.verifyToken],  ConfigAppsController.updateConfigApps);
restRouterconfigApp.get("/entity/:entity",  [authJwt.verifyToken],  ConfigAppsController.getAllConfigApps);
restRouterconfigApp.get("/:id", [authJwt.verifyToken],  ConfigAppsController.getConfigAppsById);
restRouterconfigApp.get("/images/:id",  [authJwt.verifyToken],  ConfigAppsController.getImagesArticles);

module.exports = { restRouterconfigApp };
  