
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addOrders = async (req, res, next) => {
  try {
    await app.db
      .table(`orders`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New orders created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a orders.")
    );
  }
};

const updateOrders = async (req, res, next) => {
  try {
    await app.db
      .table("orders")
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

const getAllOrderss = async (req, res, next) => {
  try {
    await app.db
      .from("orders")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "orders not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "orders fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getOrdersById = async (req, res, next) => {
  try {
    await app.db
      .from("orders")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "orders not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "orders fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addOrders,
  updateOrders,
  getAllOrderss,
  getOrdersById,
};
  