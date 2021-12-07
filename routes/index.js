const express = require("express");
const router = express.Router();

const csvController = require("../controllers/csvUploadController");

/**
 * @swagger
 *  /:
 *    post:
 *      summary: Use to upload csv file
 *      consumes:
 *        - multipart/form-data
 *      produces:
 *        - text/html
 *      parameters:
 *        - in: formData
 *          name: file
 *          type: file
 *          description: the csv file to be uploaded
 *      responses:
 *        "200":
 *          description: A successful response
 *        "400":
 *          description: Bad request
 *        "415":
 *          description: Uploaded a file that wasn't a CSV file
 *        "500":
 *          description: Internal error. Unable to process the CSV file
 *
 *
 */
router.post("/", csvController.upload, csvController.runPyScript);

module.exports = router;
