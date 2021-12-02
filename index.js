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

// app.post(
//   "/",
//   // (req, res) => {
//   //   const fileRows = [];

//   //   csv
//   //     .parseFile(req.file.path)
//   //     .on("data", (data) => {
//   //       fileRows.push(data);
//   //     })
//   //     .on("end", () => {
//   //       console.log(fileRows);
//   //       fs.unlinkSync(req.file.path);
//   //     });

//   async (req, res) => {
//     upload.single("file");

//     try {
//       if (req.file == undefined) {
//         return res.status(400).send("Please upload a CSV file!");
//       }

//       let fileRows = [];
//       let path = "/tmp/csv";

//       fs.createReadStream(path)
//         .pipe(csv.parse({ headers: true }))
//         .on("error", (error) => {
//           throw error.message;
//         })
//         .on("data", (row) => {
//           fileRows.push(row);
//         })
//         .on("end", () => {
//           console.log(fileRows);
//         });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "Could not upload the file: " + req.file.originalname,
//       });
//     }
//     // };

//     const pythonProcess = spawn("python3", ["./script.py"], csvUpload);

//     pythonProcess.stdout.on("data", (data) => {
//       res.send(`<p>${data}</p>`);
//     });
//   }
// );

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
