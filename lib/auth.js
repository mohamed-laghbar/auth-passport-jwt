const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

function initPassportAuth(app, secretKey) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
  };

  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      done(null, jwtPayload || false);
    })
  );

  app.use(passport.initialize());
  app.use((req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.redirect("/login");
      }
      req.user = user;
      next();
    })(req, res, next);
  });
}

module.exports = initPassportAuth;
