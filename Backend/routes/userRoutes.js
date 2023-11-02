const verifyToken = require("../utils/verifyToken");
const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/userController");

router.get("/:id", verifyToken, getUser);

module.exports = router;
