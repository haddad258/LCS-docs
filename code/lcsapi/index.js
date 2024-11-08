
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
fs = require('fs');
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API",
    version: "1.0.0",
    description: "Document for  plateform",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "H.rafik",
      url: "haddadrafik258@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8009",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/apis/web/*.js", "./src/apis/mobile/*.js", "./src/apis/statistic/*.js"],
};



const swaggerSpec = swaggerJSDoc(options);
const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/build"));
app.use(express.static(__dirname + "/views"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const env = require("./env");
const db = require("./database");
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.db = db;

module.exports = app;

require("./contributor-1");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("listening on port " + env.port);
app.listen(env.port || 80);
