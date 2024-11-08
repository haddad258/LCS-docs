
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../../index");

const addPublication = async (req, res, next) => {
  try {
    await app.db
      .table(`publications`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New publications created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a publications.")
    );
  }
};

const updatePublication = async (req, res, next) => {
  try {
    await app.db
      .table("publications")
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

const getAllPublications = async (req, res, next) => {
  try {
    await app.db
      .from("publications")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "publications not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "publications fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getPublicationById = async (req, res, next) => {
  try {
    await app.db
      .from("publications")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "publications not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "publications fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addPublication,
  updatePublication,
  getAllPublications,
  getPublicationById,
};
  