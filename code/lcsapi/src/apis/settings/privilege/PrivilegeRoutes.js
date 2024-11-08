
const express = require("express");
const PrivilegeController = require("./PrivilegeController");
const authJwt = require("../../../middlewares/authJwt");

const restRouterprivilege = express.Router();

restRouterprivilege.post("/", [authJwt.verifyToken],  PrivilegeController.addPrivilege);
restRouterprivilege.put("/:privilege", [authJwt.verifyToken],  PrivilegeController.updatePrivilege);
restRouterprivilege.get("/", [authJwt.verifyToken],  PrivilegeController.getAllPrivileges);
restRouterprivilege.get("/:id", [authJwt.verifyToken],  PrivilegeController.getPrivilegeById);

module.exports = { restRouterprivilege };
  