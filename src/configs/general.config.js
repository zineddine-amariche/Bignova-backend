const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("../configs/db.config");
const helmet = require("helmet");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const userRoute = require("../api/routes/users.route");
const recruteRoute = require("../api/routes/recrutement.route");
const jobRoute = require("../api/routes/job.route");
const blogRoute = require("../api/routes/blog.route");
/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.static(__dirname + "../api/fichiers/"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
/* ROUTES */
const swaggerOptions = {
  definition: {
    info: {
      title: "API",
      description: "Description",
      contact: {
        name: "Farouk Boussaa",
      },
      server: ["http://localhost:8001"],
    },
  },
  apis: ["./src/api/routes/*.js"],
};

const swaggerDoc = swaggerJsdoc(swaggerOptions);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api", userRoute);
app.use("/api", recruteRoute);
app.use("/api", jobRoute);
app.use("/api", blogRoute);
module.exports = app;
