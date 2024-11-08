const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addPlack = async (req, res, next) => {
  try {
    await app.db
      .table(`placks`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New plack created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a plack.")
    );
  }
};

const updatePlack = async (req, res, next) => {
  try {
    await app.db
      .table("placks")
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

const getAllPlacks = async (req, res, next) => {
  try {
    await app.db
      .from("placks")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "plack not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "plack fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getPlackById = async (req, res, next) => {
  try {
    await app.db
      .from("placks")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "plack not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "plack fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addPlack,
  updatePlack,
  getAllPlacks,
  getPlackById,
};
  