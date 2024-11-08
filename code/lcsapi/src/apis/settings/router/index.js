const app = require("../../../../index");
const express = require("express");

const { restRouterusers } = require("../admins/UsersRoutes");
const { restRouterprivilege } = require("../privilege/PrivilegeRoutes");

const restRouter = app;

// Import routes  use unique route names
restRouter.use("/api/users/admin", restRouterusers);
restRouter.use("/api/privileges/list", restRouterprivilege);

///ore route imports and usage as needed

module.exports = restRouter;