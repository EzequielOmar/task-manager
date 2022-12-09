const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../../models/index.js").Users;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      return User.findOne({ where: { email: email } })
        .then(async (user) => {
          if (!user) return cb(null, false, { message: "Incorrect email" });
          const passMatch = await bcrypt.compare(password, user.password);
          if (!passMatch)
            return cb(null, false, { message: "Incorrect password" });
          return cb(null, user, { message: "User logged" });
        })
        .catch((err) => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, cb) {
      return cb(null, jwtPayload);
    }
  )
);
