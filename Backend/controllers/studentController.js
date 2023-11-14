const { Student, GlobalStudent } = require("../models/student");
const errorHandler = require("../utils/error");
/////////////////////////Student Admission////////////////////
const add = async (req, res, next) => {
  const { name, fathername, dob, aadhar, mothername, rollno, standard } =
    req.body;
  //req.user is current logged in user which is trying to admit student
  req.body.parentSchoolId = req.user.id;

  //Generate a random srn between  1000 to 10000000 and ensures if any student have same srn if yes then re randomize it;
  // do {
  req.body.srn = Math.floor(Math.random() * (10000000 - 1000 + 1)) + 1000;
  // } while ((await GlobalStudent.find({ srn: req.body.srn })) !== null);

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
/////////////////////////Student Profile View////////////////////
const view = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return next(errorHandler(404, "student not found"));
    }
    if (req.user.id !== student.parentSchoolId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    return res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};
/////////////////////////Student ReAdmission////////////////////
const reAdmission = async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty("srn") || req.body.hasOwnProperty("aadhar")) {
      // here we found student with addhar or srn and checked its active must be false(not in any school means have slc)
      const student = await GlobalStudent.findOne({
        $or: [{ srn: req.body?.srn }, { aadhar: req.body?.aadhar }],
        active: false,
      });
      if (!student)
        return next(
          errorHandler(404, "student not found / Or does not have SLC")
        );
      // Generate a new unique roll number based on the student's standard
      //this function give us local latest student of same standard as we want to admit new student in.means give us last roll no of class
      const latestStudent = await Student.findOne({
        standard: student.standard,
      })
        .sort({ rollno: -1 })
        .limit(1);

      let newRollNumber = 1; // Default if no previous student in the same standard
      if (latestStudent) {
        newRollNumber = Number(latestStudent.rollno) + 1;
      }

      const newStudent = {
        name: student.name,
        dob: student.dob,
        mothername: student.mothername,
        fathername: student.fathername,
        srn: Number(student.srn),
        aadhar: Number(student.aadhar),
        active: true,
        parentSchoolId: req.user.id,
        standard: Number(student.standard),
        rollno: Number(newRollNumber),
      };
      // admitted it in our school means added in local DB and updated student parentScholId to current admitting school in Glocbal DB
      const admittedStudent = await new Student(newStudent).save();
      await GlobalStudent.findByIdAndUpdate(
        student.id,
        {
          $set: {
            active: true,
            parentSchoolId: req.user.id,
            rollno: newRollNumber,
          },
        },
        { new: true }
      );
      const {
        _id: a,
        createdAt: b,
        parentSchoolId: c,
        updatedAt: d,
        dob: e,
        ...rest
      } = admittedStudent._doc;
      return res.status(200).json({
        success: true,
        student: rest,
        message: "student Readmission Succesful",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "please provide srn or aadhar",
      });
    }
  } catch (error) {
    return next(error);
  }
};
/////////////////////////All Student List ////////////////////
const getAll = async (req, res, next) => {
  try {
    // const students = await Student.find({ parentSchoolId: req.user.id });
    const students = await Student.aggregate([
      { $match: { parentSchoolId: req.user.id } }, // Filter by parentSchoolId
      { $sort: { standard: 1, rollno: 1 } }, // Sort by standard and then by rollno
      {
        //fields sent to frontend
        $project: {
          name: 1,
          srn: 1,
          aadhar: 1,
          standard: 1,
          rollno: 1,
          fathername: 1,
          mothername: 1,
          dob: 1,
          active:1
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      students: students,
      message: "All Student List",
    });
  } catch (error) {
    return next(error);
  }
};
/////////////////////////Search Student For SLC ////////////////////
const searchStudentForSLC = async (req, res, next) => {
  try {
    let student;
    if (req.body.issueSLc) {
      student = await Student.findOne({
        $or: [{ srn: req.body.srn }, { aadhar: req.body.aadhar }],
        parentSchoolId: req.user.id,
        active: true,
      });
    } else if (req.body.reAdmission) {
      student = await GlobalStudent.findOne({
        $or: [{ srn: req.body.srn }, { aadhar: req.body.aadhar }],
        active: false,
      });
    } else {
      student = await Student.findOne({
        $or: [{ srn: req.body.srn }, { aadhar: req.body.aadhar }],
        parentSchoolId: req.user.id,
      });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "student not found",
      });
    }
    const {
      _id: a,
      createdAt: b,
      parentSchoolId: c,
      updatedAt: d,
      ...rest
    } = student._doc;
    return res.status(200).json({
      success: true,
      student: rest,
      message: "student found",
    });
  } catch (error) {
    next(error);
  }
};
/////////////////////////Student SLC ////////////////////
const issueSlc = async (req, res, next) => {
  try {
    const student = await Student.findOne({ srn: req.body.srn });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "student not found" });
    }
    if (req.user.id !== student.parentSchoolId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    // deltet student from local (School DB)
    await Student.findOneAndDelete({ srn: req.body.srn });
    // updated details of current student to active false(means not in school now and student current school to xxxxxxx)
    await GlobalStudent.findOneAndUpdate(
      { srn: req.body.srn },
      { $set: { active: false, parentSchoolId: "xxxxxxxxxxxxx" } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      student: {
        message:
          "student is availible for reAdmission Please note Student's Registration No.",
        srn: student.srn,
      },
    });
  } catch (error) {
    return next(error);
  }
};
/////////////////////////Student Profile Updatation////////////////////
const editStudentProfile = async (req, res, next) => {
  try {
    req.params.srn = Number(req.params.srn);
    if (
      req.body.hasOwnProperty("aadhar") ||
      req.body.hasOwnProperty("srn") ||
      req.body.hasOwnProperty("rollno") ||
      req.body.hasOwnProperty("standard")
    ) {
      return next(
        errorHandler(403, "you can not change srn,aadhar,rollno,standard")
      );
    }
    const studentAuth = await Student.findOne({ srn: req.params.srn });
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "student not found" });
    }
    if (req.user.id !== studentAuth.parentSchoolId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    //update student in our local DB
    const student = await Student.findOneAndUpdate(
      { srn: req.params.srn },
      { $set: req.body },
      {
        new: true,
      }
    );
    //did same for Global Db
    await GlobalStudent.findOneAndUpdate(
      { srn: req.params.srn },
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.status(200).json({ success: true, student });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  view,
  getAll,
  issueSlc,
  editStudentProfile,
  reAdmission,
  searchStudentForSLC,
};
