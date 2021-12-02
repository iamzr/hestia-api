let callPyScript = async (req, res) => {
  upload.single("file");

  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let fileRows = [];
    let path = "/tmp/csv";

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        fileRows.push(row);
      })
      .on("end", () => {
        console.log(fileRows);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
  // };

  const pythonProcess = spawn("python3", ["./script.py"], csvUpload);

  pythonProcess.stdout.on("data", (data) => {
    res.send(`<p>${data}</p>`);
  });
};

module.exports = callPyScript;
