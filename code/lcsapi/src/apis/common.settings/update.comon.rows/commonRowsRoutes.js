
const express = require("express");
const commonRowsController = require("./commonRowsController");

const authJwt = require("../../../middlewares/authJwt");
const restRoutercommonRows = express.Router();

restRoutercommonRows.put("/update/status/rows", [authJwt.verifyToken],  commonRowsController.updatecommonRows);
restRoutercommonRows.post("/get/filterd/data/byid", [authJwt.verifyToken],  commonRowsController.getListFiltred);
module.exports = { restRoutercommonRows };
  