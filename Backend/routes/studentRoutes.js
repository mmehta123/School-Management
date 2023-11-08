const express = require("express");
const router = express.Router();
const { add,view,issueSlc,editStudentProfile,reAdmission } = require("../controllers/studentController.js");
const verifyToken = require("../utils/verifyToken.js");


router.get("/:id",verifyToken,view);
router.post("/add",verifyToken,add);
router.post("/issueSlc/:srn",verifyToken,issueSlc);
router.post("/readmission",verifyToken,reAdmission);
router.post("/editStudentProfile/:srn",verifyToken,editStudentProfile);


module.exports = router;
