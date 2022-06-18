const express = require("express");

const usersControllers = require("../Controllers/UsersControllers");

const router = express.Router();

router.post("/create", usersControllers.userCreate);

router.patch("/update/:id", usersControllers.userUpdate);

router.get("/get", usersControllers.findAll);
router.get("/delete/:id", usersControllers.userDelete);

module.exports = router;
