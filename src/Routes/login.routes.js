const express = require("express");
const loginControllers = require("../Controllers/LoginControllers");

const router = express.Router();

router.post("/", loginControllers.login);

module.exports = router;
