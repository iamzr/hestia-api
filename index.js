const express = require("express");

const indexRouter = require("./routes/index");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
