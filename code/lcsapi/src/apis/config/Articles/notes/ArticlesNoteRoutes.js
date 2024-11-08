
const express = require("express");
const ArticlesNoteController = require("./ArticlesNoteController");
const authJwt = require("../../../../middlewares/authJwt");
const restRouterarticlesnotes = express.Router();

restRouterarticlesnotes.post("/", [authJwt.verifyToken],  ArticlesNoteController.addArticlesNote);
restRouterarticlesnotes.put("/:id", [authJwt.verifyToken],  ArticlesNoteController.updateArticlesNote);
restRouterarticlesnotes.get("/", [authJwt.verifyToken],  ArticlesNoteController.getAllArticlesNotes);
restRouterarticlesnotes.get("/:id", [authJwt.verifyToken],  ArticlesNoteController.getArticlesNoteById);

module.exports = { restRouterarticlesnotes };
  