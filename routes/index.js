const express = require("express");
const router = express.Router();

const csvController = require("../controllers/csvUploadController");
const upload = require("../middlewares/upload.js");

router.post("/", upload.single("file"), csvController);

router.get("/", (req, res, next) => {
  res.send("hello");
});

module.exports = router;
