const fs = require('fs');
const path = require('path');

function generateScript(modelName, routeName) {
  // Generate Controller Script
  const controllerScript = `
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const add${modelName} = async (req, res, next) => {
  try {
    await app.db
      .table(\`${routeName}\`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New ${routeName} created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a ${routeName}.")
    );
  }
};

const update${modelName} = async (req, res, next) => {
  try {
    await app.db
      .table("${routeName}")
      .update({ ...req.body, updated_at: new Date() })
      .where("id", "=", req.params.id)
      .then(() => {
        res.status(200).json({
          message: "Successfully updated",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
};

const getAll${modelName}s = async (req, res, next) => {
  try {
    await app.db
      .from("${routeName}")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "${routeName} not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "${routeName} fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const get${modelName}ById = async (req, res, next) => {
  try {
    await app.db
      .from("${routeName}")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "${routeName} not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "${routeName} fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  add${modelName},
  update${modelName},
  getAll${modelName}s,
  get${modelName}ById,
};
  `;

  // Generate Route Script
  const routeScript = `
const express = require("express");
const ${modelName}Controller = require("./${modelName.toLowerCase()}Controller");
const authJwt = require("../../../middlewares/authJwt");
const restRouter${routeName} = express.Router();

restRouter${routeName}.post("/", [authJwt.verifyToken],  ${modelName}Controller.add${modelName});
restRouter${routeName}.put("/:id", [authJwt.verifyToken],  ${modelName}Controller.update${modelName});
restRouter${routeName}.get("/", [authJwt.verifyToken],  ${modelName}Controller.getAll${modelName}s);
restRouter${routeName}.get("/:id", [authJwt.verifyToken],  ${modelName}Controller.get${modelName}ById);

module.exports = { restRouter${routeName} };
  `;

  // Write Controller and Route Scripts to Files
  const controllerFileName = path.join(__dirname, `${modelName}Controller.js`);
  fs.writeFileSync(controllerFileName, controllerScript);
  console.log(`Generated ${routeName}Controller.js at ${controllerFileName}`);

  const routeFileName = path.join(__dirname, `${modelName}Routes.js`);
  fs.writeFileSync(routeFileName, routeScript);
  console.log(`Generated ${routeName}Routes.js at ${routeFileName}`);
}

const [modelName, routeName] = process.argv.slice(2);
console.log(modelName)
console.log(routeName)

if (!modelName || !routeName) {
  console.error('Usage: node index.js <modelName> <routeName>');
} else {
  generateScript(modelName, routeName);
}
