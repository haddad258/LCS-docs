const express = require("express");
const ArticlesController = require("./ArticlesController");
const restRouterarticles = express.Router();
restRouterarticles.get("/",  ArticlesController.getAllArticless);
restRouterarticles.get("/:id",  ArticlesController.getArticlesById);

module.exports = { restRouterarticles };
  