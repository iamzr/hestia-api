const fs = require("fs");
const csv = require("fast-csv");
const uploadFile = require("../middlewares/upload").single("file");

const spawn = require("child_process").spawn;

const upload = (req, res, next) =>
  uploadFile(req, res, function(err) {
    if (err) {
      return res.status(400).send(`${err.message}`);
    }
    // console.log("passed to next");
    next();
  });

const runPyScript = async (req, res) => {
  // console.log("runPyscript");
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let path = "/tmp/csv/" + req.file.filename;
    const pythonProcess = spawn("python3", ["./script.py", path]);

    pythonProcess.stdout.on("data", (data) => {
      res.status(200).send(`${data}`);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Could not upload the file: ${req.file.originalname}`);
  }
};

module.exports = { upload, runPyScript };
