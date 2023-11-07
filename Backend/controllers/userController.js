const UserModel = require("../models/user");
const errorHandler = require("../utils/error");
const bcrypt = require("bcrypt");

const getUser = (req, res, next) => {
  try {
    const user = UserModel.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    const { password: pass, ...rest } = user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    return next(e);
  }
};
const updateUser = async (req, res, next) => {
  try {
    console.log("first", req.body);
    const user = UserModel.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User Not Found"));
    }
    if (req.body.password) {
      const hashedPass = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPass;
    }
    const finalUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    const { password: pass, ...rest } = finalUser._doc;
    return res.status(200).json(finalUser);
  } catch (error) {
    return next(error);
  }
};
module.exports = { getUser, updateUser };
