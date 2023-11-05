const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error.js");

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return next(errorHandler(404, "User Not Found!"));
    }
    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.SECRET_KEY
    );
    const { password: renamedpass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

//signup
const signUp = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await UserModel.find({ $or: [{ username }, { email }] });
    if (user.length !== 0) {
      return next(errorHandler(409, "User Already Exists!"));
    }
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = new UserModel({ ...req.body, password: hashedPass });
    await newUser.save();
    const { password: pass, ...rest } = newUser._doc;
    return res.status(201).json({ success: true, user: rest });
  } catch (e) {
    return next(error);
  }
};

const signOut = (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "user signed out" });
};

module.exports = {
  signIn,
  signUp,
  signOut,
};
