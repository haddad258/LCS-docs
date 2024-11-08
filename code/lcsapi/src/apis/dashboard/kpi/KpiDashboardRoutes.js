
const express = require("express");
const KpiDashboardController = require("./KpiDashboardController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterkpidashboard = express.Router();

restRouterkpidashboard.get("/", [authJwt.verifyToken],  KpiDashboardController.getAllKpiDashboards);
restRouterkpidashboard.get("/:id", [authJwt.verifyToken],  KpiDashboardController.getKpiDashboardById);

module.exports = { restRouterkpidashboard };
  