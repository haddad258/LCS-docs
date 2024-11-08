
const express = require("express");
const PlackController = require("./PlackController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterplack = express.Router();

restRouterplack.post("/", [authJwt.verifyToken],  PlackController.addPlack);
restRouterplack.put("/:id", [authJwt.verifyToken],  PlackController.updatePlack);
restRouterplack.get("/", [authJwt.verifyToken],  PlackController.getAllPlacks);
restRouterplack.get("/:id", [authJwt.verifyToken],  PlackController.getPlackById);

module.exports = { restRouterplack };
  