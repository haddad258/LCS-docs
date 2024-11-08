
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");




const getAllKpiDashboards = async (req, res, next) => {
  try {
    await app.db
      .from("kpidashboard")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "kpidashboard not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "kpidashboard fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getKpiDashboardById = async (req, res, next) => {
  try {
    await app.db
      .from("kpidashboard")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "kpidashboard not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "kpidashboard fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addKpiDashboard,
  updateKpiDashboard,
  getAllKpiDashboards,
  getKpiDashboardById,
};
  