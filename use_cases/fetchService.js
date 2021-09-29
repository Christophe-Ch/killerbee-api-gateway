const axios = require("axios");
const routes = require("../config/routes.json");
const jwtService = require("../services/jwtService");

module.exports = async (request) => {
  const service = request.path.split("/")[1];
  const config = routes.microservices.find((route) => route.name === service);

  if (!config) {
    const error = new Error("Service not found");
    error.httpCode = 404;
    throw error;
  }

  if (config.authRequired) {
    if (!request.headers.authorization) {
      const error = new Error("Authorization required");
      error.httpCode = 401;
      throw error;
    }

    if (
      !jwtService.isValid(request.headers.authorization.split("Bearer ")[1])
    ) {
      const error = new Error("Invalid authorization token");
      error.httpCode = 401;
      throw error;
    }
  }

  const axiosRequestConfig = {
    method: request.method,
    url: `http:/${request.path}`,
  };

  if (request.method === "POST" || request.method === "PUT") {
    axiosRequestConfig.data = request.body;
  }

  return await axios
    .request(axiosRequestConfig)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      const error = new Error(err.response.data);
      error.httpCode = err.response.status;
      throw error;
    });
};
