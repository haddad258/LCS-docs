const app = require("../../../../index");
const express = require("express");

const { restRoutercommonRows } = require("../update.comon.rows/commonRowsRoutes");

const restRouter = app;

// Import routes  use unique route names
restRouter.use("/api/common/", restRoutercommonRows);


// Add more route imports and usage as needed

module.exports = restRouter;