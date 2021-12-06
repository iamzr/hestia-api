const http = require("http");
const fs = require("fs");

const express = require("express");
const spawn = require("child_process").spawn;
const multer = require("express");
const csv = require("fast-csv");

const upload = multer({ dest: "tmp/csv" });

const indexRouter = require("./routes/index");

global.__basedir = __dirname + "/..";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
