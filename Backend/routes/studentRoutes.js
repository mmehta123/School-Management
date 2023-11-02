const express = require("express");
const router = express.Router();
const { add,view,issueSlc,editStudentProfile } = require("../controllers/studentController.js");
const verifyToken = require("../utils/verifyToken.js");


router.get("/:id",verifyToken,view);
router.post("/add",verifyToken,add);
router.post("/issueSlc/:id",verifyToken,issueSlc);
router.post("/editStudentProfile/:id",verifyToken,editStudentProfile);


module.exports = router;
