const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

/**
 * Initializes Passport authentication with JWT Strategy.
 *
 * This function sets up the Passport JWT strategy for the given Express application.
 * It uses the provided secret key to validate JWT tokens found in the Authorization header.
 *
 * On successful authentication, the JWT payload is attached to req.user.
 * On failure (invalid token or error), the user is redirected to the "/login" route.
 *
 * @param {express.Application} app - The Express application instance.
 * @param {string} secretKey - The secret key used for verifying JWT tokens.
 */
function initPassportAuth(app, secretKey) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
  };

  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      // If the token is valid, the payload is forwarded
      done(null, jwtPayload || false);
    })
  );

  app.use(passport.initialize());
  app.use((req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.redirect("/login");
      }
      req.user = user; // Attach the user to the request object
      next();
    })(req, res, next);
  });
}

module.exports = initPassportAuth;
