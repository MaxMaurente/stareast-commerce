const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const routes = require("./routes");

const swaggerDocument = YAML.load("./src/config/swagger.yaml");

const app = express();

app.use(express.json());
app.use(routes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
