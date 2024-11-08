
const express = require("express");
const ConfigAppsController = require("./ConfigAppsController");
const restRouterconfigApp = express.Router();

restRouterconfigApp.get("/entity/:entity",  ConfigAppsController.getAllConfigApps);
// restRouterconfigApp.get("/:id", ConfigAppsController.getConfigAppsById);
restRouterconfigApp.get("/entite", ConfigAppsController.getConfigAppsById);

module.exports = { restRouterconfigApp };
  