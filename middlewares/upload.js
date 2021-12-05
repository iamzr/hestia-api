const multer = require("multer");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb({ message: "This is not a CSV file. Please upload a CSV file." }, false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp/csv");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var uploadFile = multer({ dest: "/tmp/csv", fileFilter: csvFilter });

module.exports = uploadFile;
