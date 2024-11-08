const express = require("express");
const PlacksArticlesController = require("../ArticlesController");
const authJwt = require("../../../../middlewares/authJwt");
const restRouterplacksarticles = express.Router();

restRouterplacksarticles.post("/", [authJwt.verifyToken],  PlacksArticlesController.addPlacksArticles);
restRouterplacksarticles.put("/:id", [authJwt.verifyToken],  PlacksArticlesController.updatePlacksArticles);
restRouterplacksarticles.get("/", [authJwt.verifyToken],  PlacksArticlesController.getAllPlacksArticless);
restRouterplacksarticles.get("/:id", [authJwt.verifyToken],  PlacksArticlesController.getPlacksArticlesById);

module.exports = { restRouterplacksarticles };
  