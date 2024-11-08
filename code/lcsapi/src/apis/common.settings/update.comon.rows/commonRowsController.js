
const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");



const updatecommonRows = async (req, res, next) => {
  try {
    await app.db
      .table(req.body.data)
      .update({ status:req.body.status })
      .where("id", "=", req.body.id)
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
const getListFiltred = async (req, res, next) => {
  try {
    await app.db
      .table(req.body.entity)
      .select("*")
      .where(req.body.filerAttr,req.body.filerId)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "locations not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "locations fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};


module.exports = {
  updatecommonRows,
  getListFiltred

};
  