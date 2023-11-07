const verifyToken = require("../utils/verifyToken");
const express = require("express");
const router = express.Router();
const { getUser,updateUser } = require("../controllers/userController");

router.get("/:id", verifyToken, getUser);
router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
