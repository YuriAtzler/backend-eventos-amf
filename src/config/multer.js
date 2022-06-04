const multer = require("multer");
const path = require("path");

const tmpFolder = path.resolve(__dirname, "..", "..", "upload");

module.exports = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      return callback(
        null,
        `${Math.floor(Date.now() * Math.random()).toString(36)}${
          file.originalname
        }`
      );
    },
  }),
};
