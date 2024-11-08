
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");
const bcrypt = require('bcrypt-nodejs');

const addProviders = async (req, res, next) => {
  try {
    await app.db
      .table(`providers`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New providers created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a providers.")
    );
  }
};

const updateProviders = async (req, res, next) => {
  try {
    await app.db
      .table("providers")
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

const getAllProviders = async (req, res, next) => {
  try {
    await app.db
      .from("providers")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "providers not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "providers fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getProvidersById = async (req, res, next) => {
  try {
    await app.db
      .from("providers")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "providers not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "providers fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
const updateUserPassword = async (req, res, next) => {
  try {
    const { password } = req.body
    await app.db
      .table("providers")
      .update({ password: bcrypt.hashSync(password), updated_at: new Date() })
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
module.exports = {
  addProviders,
  updateProviders,
  getAllProviders,
  getProvidersById,
  updateUserPassword
};
