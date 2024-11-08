
const express = require("express");
const ProviderCalendarController = require("./ProviderCalendarController");
const authJwt = require("../../../../middlewares/authJwt");
const restRouterprovidercalendar = express.Router();

restRouterprovidercalendar.post("/", [authJwt.verifyToken],  ProviderCalendarController.addProviderCalendar);
restRouterprovidercalendar.put("/:id", [authJwt.verifyToken],  ProviderCalendarController.updateProviderCalendar);
restRouterprovidercalendar.get("/", [authJwt.verifyToken],  ProviderCalendarController.getAllProviderCalendars);
restRouterprovidercalendar.get("/:id", [authJwt.verifyToken],  ProviderCalendarController.getProviderCalendarById);

module.exports = { restRouterprovidercalendar };
  