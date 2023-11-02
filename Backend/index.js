const express = require("express");
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const studentRoute = require("./routes/studentRoutes.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/student", studentRoute);

// middleware for handling error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`.bgGreen.black);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database is connected".bgGreen.black);
    })
    .catch((err) => {
      console.log(err);
    });
});
