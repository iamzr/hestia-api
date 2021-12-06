const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Swagger Docs
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Hestia API",
      description:
        "An API that runs a csv file through hestia-earth.utils pivot_csv and returns output as a csv string",
      contact: {
        name: "Zia Rehman",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Routes
const indexRouter = require("./routes/index");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use("/", indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
