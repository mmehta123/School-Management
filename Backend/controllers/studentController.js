const { Student, GlobalStudent } = require("../models/student");
const errorHandler = require("../utils/error");

const add = async (req, res, next) => {
  const { name, fathername, dob, aadhar, mothername, rollno, standard } =
    req.body;
  //req.user is current logged in user which is trying to admit student
  req.body.parentSchoolId = req.user.id;

  //Generate a random srn between  1000 to 10000000 and ensures if any student have same srn if yes then re randomize it;
  // do {
  req.body.srn = Math.floor(Math.random() * (10000000 - 1000 + 1)) + 1000;
  // } while ((await GlobalStudent.find({ srn: req.body.srn })) !== null);
  console.log(req.body);

  //if user exists with same aadhar card in same school
  try {
    const student = await Student.find({
      $or: [{ aadhar }],
    });

    //if user exists with same aadhar card in same school here glbal student model is used so that it can keep track of all the students of all schools
    // if user is not in our school but its srn and aadhar is register so we cant make new admission we can do only readmisson using aadhar no. or srn
    const globalStudent = await GlobalStudent.find({
      $or: [{ aadhar }],
    });

    // if student is already in our school means found in our local student model
    if (student.length !== 0) {
      return next(
        errorHandler(
          409,
          "student with same aadhar no. already admitted in your school"
        )
      );
    }

    // if student is not in our school but found in other chool db student model
    if (globalStudent.length !== 0) {
      return next(
        errorHandler(
          500,
          "student already admitted in another school try readdmission if student have slc"
        )
      );
    }

    //if nothing goes wrong (not admitted anywhere then we proceeds to check if use have unique roll no for respective class )
    if (await Student.findOne({ standard: standard, rollno: rollno })) {
      return next(errorHandler(409, "roll no is not allowed"));
    }

    //now we save new student in our and Global Db
    const newStudent = new Student(req.body);
    await new GlobalStudent(req.body).save();
    await newStudent.save();
    return res.status(201).json({ success: true, student: newStudent });
  } catch (e) {
    return next(e);
  }
};
const view = (req, res, next) => {};
const issueSlc = (req, res, next) => {};
const editStudentProfile = (req, res, next) => {};

module.exports = { add, view, issueSlc, editStudentProfile };
