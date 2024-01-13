const createServer = require("./lib/server");
const initPassportAuth = require("./lib/auth");
const { generateToken, verifyToken } = require("./lib/token"); // Replace with the actual path to your module file

module.exports = {
  createServer,
  initPassportAuth,
  generateToken,
  verifyToken,
};
