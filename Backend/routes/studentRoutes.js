const express = require("express");
const router = express.Router();
const {
  add,
  view,
  searchStudentForSLC,
  getAll,
  issueSlc,
  editStudentProfile,
  reAdmission,
  getClasswiseStudent,
} = require("../controllers/studentController.js");
const verifyToken = require("../utils/verifyToken.js");

router.get("/allstudents", verifyToken, getAll);
router.get("/classwisedata", verifyToken, getClasswiseStudent);
router.get("/:id", verifyToken, view);
router.post("/search", verifyToken, searchStudentForSLC);
router.post("/add", verifyToken, add);
router.post("/issueSlc", verifyToken, issueSlc);
router.post("/readmission", verifyToken, reAdmission);
router.post("/editStudentProfile/:srn", verifyToken, editStudentProfile);

module.exports = router;
