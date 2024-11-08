const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../index");
const config = require("../../config");



const getAllArticless = async (req, res, next) => {
  try {
    await app.db
      .from("articles")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "articles not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "articles fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getArticlesById = async (req, res, next) => {
  try {
    await app.db
      .from("articles")
      .select("*")
      .where("id", "=", req.params.id)
      .first()
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "articles not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "articles fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};
const getAllArticlesDisounts = async (req, res, next) => {
  try {
    console.log("heeer")
    await app.db
      .from("discountarticles")
      .join("articles", "discountarticles.articleId", "articles.id") // Join with the articles table
      .select("articles.*") // Select only the articles fields
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "No articles found for the given discount",
            status: 200,
            data: [],
          });
        }
        res.json({
          message: "Articles fetched successfully",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

module.exports = {
  getAllArticless,
  getArticlesById,
  getAllArticlesDisounts
};
