const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    aadhar: {
      type: Number,
      required: true,
      unique: true,
    },
    srn: {
      type: Number,
      required: true,
      unique: true,
    },
    rollno: {
      type: Number,
      required: true,
    },
    mothername: {
      type: String,
      required: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    parentSchoolId: {
      type: String,
      required: true,
    },
    standard: {
      type: Number,
      required: true,
      default: 1,
      unique:false
    },
  },
  { timestamps: true, versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);
const GlobalStudent = mongoose.model("GlobalStudent", studentSchema);
module.exports = { Student, GlobalStudent };
