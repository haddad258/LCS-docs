const express = require("express");
const DiscountArticlesController = require("../ArticlesController");
const authJwt = require("../../../../middlewares/authJwt");
const restRouterdiscountarticles = express.Router();

restRouterdiscountarticles.post("/", [authJwt.verifyToken],  DiscountArticlesController.addDiscountArticles);
restRouterdiscountarticles.put("/:id", [authJwt.verifyToken],  DiscountArticlesController.updateDiscountArticles);
restRouterdiscountarticles.get("/", [authJwt.verifyToken],  DiscountArticlesController.getAllDiscountArticless);
restRouterdiscountarticles.get("/:id", [authJwt.verifyToken],  DiscountArticlesController.getDiscountArticlesById);

module.exports = { restRouterdiscountarticles };
  