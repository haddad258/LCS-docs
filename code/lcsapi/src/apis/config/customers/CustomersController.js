
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");
const bcrypt = require('bcrypt-nodejs');

const addCustomers = async (req, res, next) => {
  try {
    await app.db
      .table(`customers`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New customers created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a customers.")
    );
  }
};

const updateCustomers = async (req, res, next) => {
  try {
    await app.db
      .table("customers")
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

const getAllCustomers = async (req, res, next) => {
  try {
    await app.db
      .from("customers")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "customers not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "customers fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getCustomersById = async (req, res, next) => {
  try {
    await app.db
      .from("customers")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "customers not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "customers fetched with the given id",
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
      .table("customers")
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



const getImagesCustomers = async (req, res, next) => {
  try {
    await app.db
      .from("customerimages")
      .select("*")
      .where("identity", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "customer not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "customer fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
module.exports = {
  addCustomers,
  updateCustomers,
  getAllCustomers,
  getCustomersById,
  updateUserPassword,
  getImagesCustomers
};
