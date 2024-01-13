const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

/**
 * Creates and configures an Express application.
 *
 * This function initializes an Express app with several middlewares:
 * - `bodyParser.urlencoded`: for parsing URL-encoded bodies.
 * - `bodyParser.json()`: for parsing JSON request bodies.
 * - `express-session`: for session management.
 *
 * The session middleware is configured to use a secret from the environment variables.
 * In production, it sets the session cookie to be secure.
 *
 * @returns {express.Application} The configured Express application.
 */
function createServer() {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production" },
    })
  );

  return app;
}

module.exports = createServer;
