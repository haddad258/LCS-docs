const express = require("express");
const ArticlesController = require("./ArticlesController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterarticles = express.Router();


restRouterarticles.post("/", [authJwt.verifyToken],  ArticlesController.addArticles);
restRouterarticles.put("/:id", [authJwt.verifyToken],  ArticlesController.updateArticles);
restRouterarticles.get("/", [authJwt.verifyToken],  ArticlesController.getAllArticless);
restRouterarticles.get("/:id", [authJwt.verifyToken],  ArticlesController.getArticlesById);

module.exports = { restRouterarticles };
  