const createHttpError = require("http-errors");
const uuid = require("uuid");
const app = require("../../../../index");


const addArticles = async (req, res, next) => {
  try {
    await app.db
      .table(`articles`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New articles created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a articles.")
    );
  }
};

const updateArticles = async (req, res, next) => {
  try {
    await app.db
      .table("articles")
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



const addDiscountArticles = async (req, res, next) => {
  try {
    await app.db
      .table(`discountarticles`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New discountarticles created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a discountarticles.")
    );
  }
};

const updateDiscountArticles = async (req, res, next) => {
  try {
    await app.db
      .table("discountarticles")
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

const getAllDiscountArticless = async (req, res, next) => {
  try {
    await app.db
      .from("discountarticles")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "discountarticles not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "discountarticles fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getDiscountArticlesById = async (req, res, next) => {
  try {
    await app.db
      .from("discountarticles")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "discountarticles not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "discountarticles fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};


  
const addPlacksArticles = async (req, res, next) => {
  try {
    await app.db
      .table(`placksarticles`)
      .insert(req.body)
      .then(() => {
        res.status(200).json({
          message: "New placksarticles created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(
      new createHttpError.BadRequest("Invalid values to create a placksarticles.")
    );
  }
};

const updatePlacksArticles = async (req, res, next) => {
  try {
    await app.db
      .table("placksarticles")
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

const getAllPlacksArticless = async (req, res, next) => {
  try {
    await app.db
      .from("placksarticles")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "placksarticles not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "placksarticles fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
};

const getPlacksArticlesById = async (req, res, next) => {
  try {
    await app.db
      .from("placksarticles")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "placksarticles not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "placksarticles fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
};



module.exports = {
  addArticles,
  updateArticles,
  getAllArticless,
  getArticlesById,



  addDiscountArticles,
  updateDiscountArticles,
  getAllDiscountArticless,
  getDiscountArticlesById,



  addPlacksArticles,
  updatePlacksArticles,
  getAllPlacksArticless,
  getPlacksArticlesById,
};
  