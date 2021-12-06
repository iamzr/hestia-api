const multer = require("multer");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "This is not a CSV file. Please upload a CSV file.",
        code: 415,
      },
      false
    );
  }
};

var uploadFile = multer({ dest: "/tmp/csv", fileFilter: csvFilter });

module.exports = uploadFile;
