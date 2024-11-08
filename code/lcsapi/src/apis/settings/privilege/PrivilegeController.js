
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addPrivilege = async (req, res, next) => {
  try {

    await app.db
      .table(`privilege`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New privilege created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a privilege.")
    );
  }
};

const updatePrivilege = async (req, res, next) => {
  try {

    await app.db
      .table("privilege")
      .update({ ...req.body, updated_at: new Date() })
      .where("privilege", "=", req.body.privilege)
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

const getAllPrivileges = async (req, res, next) => {
  try {
    await app.db
      .from("privilege")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "privilege not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "privilege fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getPrivilegeById = async (req, res, next) => {
  try {
    await app.db
      .from("privilege")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "privilege not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "privilege fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addPrivilege,
  updatePrivilege,
  getAllPrivileges,
  getPrivilegeById,
};
