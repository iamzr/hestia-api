const fs = require("fs");
const csv = require("fast-csv");

const spawn = require("child_process").spawn;

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let path = "/tmp/csv/" + req.file.filename;
    const pythonProcess = spawn("python3", ["./script.py", path]);

    pythonProcess.stdout.on("data", (data) => {
      res.send(`<p>${data}</p>`);
    });
    // let fileRows = [];
    // let path = "/tmp/csv/" + req.file.filename;

    // fs.createReadStream(path)
    //   .pipe(csv.parse({ headers: true }))
    //   .on("error", (error) => {
    //     throw error.message;
    //   })
    //   .on("data", (row) => {
    //     fileRows.push(row);
    //   })
    //   .on("end", () => {
    //     // res.send("done");

    //   });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = upload;
