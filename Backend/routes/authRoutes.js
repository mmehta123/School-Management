const express = require("express");
const router = express.Router();
const { signIn, signUp,signOut } = require("../controllers/authController.js");

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signout", signOut);

module.exports = router;
