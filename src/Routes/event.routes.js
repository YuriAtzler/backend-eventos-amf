const express = require("express");
const multer = require("multer");
const uploadConfig = require("../config/multer");

const eventControllers = require("../Controllers/EventControllers");

const upload = multer(uploadConfig);
const router = express.Router();
const maxImage = 5;

router.post(
  "/create",
  upload.array("image", maxImage),
  eventControllers.eventCreate
);

router.get("/get", eventControllers.findAll);
router.get("/delete/:id", eventControllers.eventDelete);

module.exports = router;
