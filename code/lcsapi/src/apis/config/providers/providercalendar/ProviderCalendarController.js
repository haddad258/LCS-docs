
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../../index");

const addProviderCalendar = async (req, res, next) => {
  try {
    await app.db
      .table(`providercalendar`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New providercalendar created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a providercalendar.")
    );
  }
};

const updateProviderCalendar = async (req, res, next) => {
  try {
    await app.db
      .table("providercalendar")
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

const getAllProviderCalendars = async (req, res, next) => {
  try {
    await app.db
      .from("providercalendar")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "providercalendar not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "providercalendar fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getProviderCalendarById = async (req, res, next) => {
  try {
    await app.db
      .from("providercalendar")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "providercalendar not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "providercalendar fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};

module.exports = {
  addProviderCalendar,
  updateProviderCalendar,
  getAllProviderCalendars,
  getProviderCalendarById,
};
  