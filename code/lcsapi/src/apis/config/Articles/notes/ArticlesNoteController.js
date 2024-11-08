
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../../index");

const addArticlesNote = async (req, res, next) => {
  try {
    await app.db
      .table(`articlesnotes`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New articlesnotes created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a articlesnotes.")
    );
  }
};

const updateArticlesNote = async (req, res, next) => {
  try {
    await app.db
      .table("articlesnotes")
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

const getAllArticlesNotes = async (req, res, next) => {
  try {
    await app.db
      .from("articlesnotes")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "articlesnotes not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "articlesnotes fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getArticlesNoteById = async (req, res, next) => {
  try {
    await app.db
      .from("articlesnotes")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "articlesnotes not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "articlesnotes fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addArticlesNote,
  updateArticlesNote,
  getAllArticlesNotes,
  getArticlesNoteById,
};
  