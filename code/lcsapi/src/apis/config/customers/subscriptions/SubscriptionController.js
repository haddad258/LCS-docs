
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../../index");

const addSubscription = async (req, res, next) => {
  try {
    await app.db
      .table(`subscriptions`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New subscriptions created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a subscriptions.")
    );
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    await app.db
      .table("subscriptions")
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

const getAllSubscriptions = async (req, res, next) => {
  try {
    await app.db
      .from("subscriptions")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "subscriptions not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "subscriptions fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getSubscriptionById = async (req, res, next) => {
  try {
    await app.db
      .from("subscriptions")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "subscriptions not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "subscriptions fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addSubscription,
  updateSubscription,
  getAllSubscriptions,
  getSubscriptionById,
};
  