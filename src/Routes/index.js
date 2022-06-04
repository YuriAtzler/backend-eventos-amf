const express = require("express");

const users = require("./users.routes");
const events = require("./event.routes");

const router = express.Router();

router.use("/events", events);
router.use("/users", users);

module.exports = router;
