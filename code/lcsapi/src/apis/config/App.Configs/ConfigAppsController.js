
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addConfigApps = async (req, res, next) => {
  try {
    await app.db
      .table(req.params.entity)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New configApp created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a configApp.")
    );
  }
};

const updateConfigApps = async (req, res, next) => {
  try {
    await app.db
      .table(req.params.entity)
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

const getAllConfigApps = async (req, res, next) => {
  try {
    await app.db
      .from(req.params.entity)
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "configApp not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "configApp fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getConfigAppsById = async (req, res, next) => {
  try {
    await app.db
      .from(req.params.entity)
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "configApp not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "configApp fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
const getImagesArticles = async (req, res, next) => {
  try {
    ("id")
    await app.db
      .from("imagesarticles")
      .select("*")
      .where("identity", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "configApp not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "configApp fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
module.exports = {
  addConfigApps,
  updateConfigApps,
  getAllConfigApps,
  getConfigAppsById,
  getImagesArticles
};
  