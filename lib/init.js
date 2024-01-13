const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.init();

module.exports = function init() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true },
    })
  );

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
  };

  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      if (jwtPayload) {
        done(null, { jwtPayload });
      } else {
        done(null, false);
      }
    })
  );
};

module.exports = function isAthenticated() {
  return passport.authenticate("jwt", { session: false });
};

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "You are authorized to access this resource" });
  }
);

module.exports = function port(port) {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};
