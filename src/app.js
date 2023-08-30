const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { google } = require("googleapis");

require("dotenv").config();

const middlewares = require("./middlewares");

const sheets = google.sheets({
  version: "v4",
  auth: "AIzaSyAN77FP5EQeqWt5kw5bQXw5XNDmJkDpoVg",
});

const params = {
  spreadsheetId: "1XTDu_6JuLsLoXy2OcqnjUDCCHTOzZDxxqPadxrWRfyk",
  range: "Action!A2:F",
};

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const data = await sheets.spreadsheets.values.get(params, (err, result) => {
    if (err) {
      console.error(err);
      throw err;
    }
    res.json(result.data.values);
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
