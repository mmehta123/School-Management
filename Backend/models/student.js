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
      type: String,
      required: true,
      unique: true,
    },
    srn: {
      type: String,
      required: true,
      unique: true,
    },
    rollno: {
      type: Number,
      required: true,
      unique: true,
    },
    mothername: {
      type: String,
      required: true,
    },
    fathername: {
      type: String,
      required: true,
    },
    active:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true, versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
