const fs = require("fs");
const csv = require("fast-csv");
const uploadFile = require("../middlewares/upload").single("file");

const spawn = require("child_process").spawn;

const upload = (req, res, next) =>
  uploadFile(req, res, function(err) {
    if (err) {
      if (err.code == 415) {
        return res.status(415).send(`${err.message}`);
      } else {
        return res.status.send(`${err.message}`);
      }
    }
    next();
  });

const runPyScript = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let path = "/tmp/csv/" + req.file.filename;
    const pythonProcess = spawn("python3", ["./script.py", path]);

    pythonProcess.stderr.on("data", function(data) {
      console.log(data);
      res
        .status(500)
        .send(`Could not process the file: ${req.file.originalname}`);
    });

    pythonProcess.stdout.on("data", (data) => {
      console.log("stuff");
      res.status(200).send(`${data}`);
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(`Could not process the file: ${req.file.originalname}`);
  }
};

module.exports = { upload, runPyScript };
