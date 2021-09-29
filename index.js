const express = require("express");
const dotenv = require("dotenv");
const fetchService = require("./use_cases/fetchService");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(async (req, res) => {
  const request = {
    path: req.originalUrl,
    headers: req.headers,
    body: req.body,
    method: req.method,
    jwt: req.headers.authorization,
  };

  try {
    return res.send(await fetchService(request));
  } catch (error) {
    if (error.httpCode) {
      return res.status(error.httpCode).send(error.message);
    }

    console.log(error);
    return res.status(500).send("An error occured");
  }
});

app.listen(80);
