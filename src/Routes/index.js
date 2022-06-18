const express = require("express");

const users = require("./users.routes");
const events = require("./event.routes");
const login = require("./login.routes");

const router = express.Router();

router.use("/events", events);
router.use("/login", login);
router.use("/users", users);

module.exports = router;
