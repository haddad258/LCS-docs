
const express = require("express");
const OrganizationIgenInfoController = require("./OrganizationIgenInfoController");
const authJwt = require("../../../middlewares/authJwt");
const restRouterorganization_gen_info = express.Router();

restRouterorganization_gen_info.post("/", [authJwt.verifyToken],  OrganizationIgenInfoController.addOrganizationIgenInfo);
restRouterorganization_gen_info.put("/:id", [authJwt.verifyToken],  OrganizationIgenInfoController.updateOrganizationIgenInfo);
restRouterorganization_gen_info.get("/", [authJwt.verifyToken],  OrganizationIgenInfoController.getAllOrganizationIgenInfos);
restRouterorganization_gen_info.get("/:id", [authJwt.verifyToken],  OrganizationIgenInfoController.getOrganizationIgenInfoById);

module.exports = { restRouterorganization_gen_info };
  