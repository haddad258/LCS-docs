
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../../index");

const addProviderArticles = async (req, res, next) => {
  try {
    await app.db
      .table(`providerarticles`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New providerarticles created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a providerarticles.")
    );
  }
};

const updateProviderArticles = async (req, res, next) => {
  try {
    await app.db
      .table("providerarticles")
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

const getAllProviderArticless = async (req, res, next) => {
  try {
    await app.db
      .from("providerarticles")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "providerarticles not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "providerarticles fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getProviderArticlesById = async (req, res, next) => {
  try {
    await app.db
      .from("providerarticles")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "providerarticles not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "providerarticles fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addProviderArticles,
  updateProviderArticles,
  getAllProviderArticless,
  getProviderArticlesById,
};
  