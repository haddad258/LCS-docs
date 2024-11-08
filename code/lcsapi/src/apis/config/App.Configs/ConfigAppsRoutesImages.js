
const express = require("express");
const ConfigAppsController = require("./ConfigAppsController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterconfigAppImages = express.Router();

restRouterconfigAppImages.get("/:id",  [authJwt.verifyToken],  ConfigAppsController.getImagesArticles);

module.exports = { restRouterconfigAppImages };
  