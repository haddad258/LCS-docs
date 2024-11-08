
const express = require("express");
const ProfilesIdController = require("./ProfilesIdController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterprofilesId = express.Router();

restRouterprofilesId.post("/", [authJwt.verifyToken],  ProfilesIdController.addProfilesId);
restRouterprofilesId.put("/:id", [authJwt.verifyToken],  ProfilesIdController.updateProfilesId);
restRouterprofilesId.get("/", [authJwt.verifyToken],  ProfilesIdController.getAllProfilesIds);
restRouterprofilesId.get("/:id", [authJwt.verifyToken],  ProfilesIdController.getProfilesIdById);

module.exports = { restRouterprofilesId };
  