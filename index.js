// Modules
const express = require("express");
const fs = require("fs");
const https = require("https");
const dotenv = require("dotenv");
const fetchService = require("./use_cases/fetchService");

dotenv.config();

// HTTPS credentials
const privateKey = fs.readFileSync("cert/gateway.key", "utf8");
const certificate = fs.readFileSync("cert/gateway-certificate.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

    return res.status(500).send("An error occured");
  }
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);
