const UserModel = require("../models/user");
const errorHandler = require("../utils/error");

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
module.exports = { getUser };
