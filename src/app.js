require("express-async-errors");
const express = require("express");
const routes = require("./Routes");
const appError = require("./Errors/appError");
const uploadConfig = require("./config/multer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  app.use(cors());
  next();
});

app.use("/images", express.static(uploadConfig.directory));

app.use(routes);

//MIDDLEWARE

app.use((err, _request, response, _) => {
  if (err instanceof appError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  return response.status(500).json({
    message: "Erro interno do sistema!",
  });
});

module.exports = app;
