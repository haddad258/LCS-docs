
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addProfilesId = async (req, res, next) => {
  try {
    await app.db
      .table(`profilesId`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New profilesId created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a profilesId.")
    );
  }
};

const updateProfilesId = async (req, res, next) => {
  try {
    await app.db
      .table("profilesId")
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

const getAllProfilesIds = async (req, res, next) => {
  try {
    await app.db
      .from("profilesId")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "profilesId not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "profilesId fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getProfilesIdById = async (req, res, next) => {
  try {
    await app.db
      .from("profilesId")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "profilesId not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "profilesId fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addProfilesId,
  updateProfilesId,
  getAllProfilesIds,
  getProfilesIdById,
};
  