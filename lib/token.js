const jwt = require("jsonwebtoken");

/**
 * Generates a JWT token.
 * @param {Object} payload - The payload to encode in the JWT.
 * @param {string} secretKey - The secret key used for signing the JWT.
 * @param {string} [expiresIn='1h'] - Expiration time for the JWT.
 * @returns {string} The generated JWT token.
 */
function generateToken(payload, secretKey, expiresIn = "1h") {
  return jwt.sign(payload, secretKey, { expiresIn });
}

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @param {string} secretKey - The secret key used for signing the JWT.
 * @returns {Object|null} The decoded token payload if verification is successful, otherwise null.
 */
function verifyToken(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
