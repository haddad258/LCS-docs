
const express = require("express");
const PublicationController = require("./PublicationController");
const authJwt = require("../../../../middlewares/authJwt");
const restRouterpublications = express.Router();

restRouterpublications.post("/", [authJwt.verifyToken],  PublicationController.addPublication);
restRouterpublications.put("/:id", [authJwt.verifyToken],  PublicationController.updatePublication);
restRouterpublications.get("/", [authJwt.verifyToken],  PublicationController.getAllPublications);
restRouterpublications.get("/:id", [authJwt.verifyToken],  PublicationController.getPublicationById);

module.exports = { restRouterpublications };
  