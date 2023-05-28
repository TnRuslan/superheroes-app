const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { HttpError } = require("./helpers");
const { heroRouter } = require("./routes/superheroesRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/heroes", heroRouter);

app.use((req, res, next) => {
  next(HttpError(404, "Not Found2"));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
