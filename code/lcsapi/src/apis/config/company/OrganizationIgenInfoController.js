
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");

const addOrganizationIgenInfo = async (req, res, next) => {
  try {
    await app.db
      .table(`organization_gen_info`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New organization_gen_info created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a organization_gen_info.")
    );
  }
};

const updateOrganizationIgenInfo = async (req, res, next) => {
  try {
    await app.db
      .table("organization_gen_info")
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

const getAllOrganizationIgenInfos = async (req, res, next) => {
  try {
    await app.db
      .from("organization_gen_info")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "organization_gen_info not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "organization_gen_info fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getOrganizationIgenInfoById = async (req, res, next) => {
  try {
    await app.db
      .from("organization_gen_info")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "organization_gen_info not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "organization_gen_info fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addOrganizationIgenInfo,
  updateOrganizationIgenInfo,
  getAllOrganizationIgenInfos,
  getOrganizationIgenInfoById,
};
  