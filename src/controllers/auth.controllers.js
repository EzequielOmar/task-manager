const User = require("../../models/index.js").Users;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return next({
        status: 400,
        message: info ? info.message : "Login failed",
        err: err ? err : "User does not exist",
      });
    req.login(user, { session: false }, (err) => {
      if (err)
        return next({
          status: 500,
          message: "Internal server error",
          err: err,
        });
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 12, //* 12hs of duration
      });
      return res
        .status(200)
        .json({ message: info.message, accessToken: token });
    });
  })(req, res, next);
};

exports.signup = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(
      req.body.password,
      parseInt(process.env.HASH_SALTS)
    );
    const user_data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    };
    const user = await User.create(user_data);
    return res.status(201).json({ message: "User created", data: user });
  } catch (err) {
    return next({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    if (!user)
      return next({
        status: 400,
        message: "Delete user failed",
        err: "User does not exist",
      });
    return res.status(200).json({ message: "User deleted", data: user });
  } catch (err) {
    return next({
      status: 500,
      message: "Internal server error",
      err: err,
    });
  }
};
