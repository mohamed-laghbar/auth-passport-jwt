# auth-passport-jwt

`auth-passport-jwt` is a simple and flexible authentication library for Express.js applications using Passport.js and JSON Web Tokens (JWT).

## Features

- Easy JWT authentication setup with Passport.js.
- Middleware for secure route handling and redirecting unauthenticated requests.
- Utility functions for generating and verifying JWTs.

## Installation

```
npm install auth-passport-jwt
```

When you initialize our package, it also automatically initializes and configures an Express application for you. The configured Express app includes the following middlewares:

`bodyParser.urlencoded`: Used for parsing URL-encoded request bodies.
`bodyParser.json()` : Used for parsing JSON request bodies.
`express-session`: Used for session management.
The session middleware is configured to use a secret from the environment variables `SESSION_SECRET`. In production environments, it sets the session cookie to be secure.

## Usage

### Initializing Passport JWT Authentication

Once initialized, this package sets up JWT authentication for your routes. It does the following:

- Parses JWT tokens from the Authorization header.
- Verifies the tokens using the provided secret key.
- On successful authentication, the JWT payload is attached to the req.user object.
- On failure (invalid token or error), the user is redirected to the `/login` route.


## Protecting Routes

To protect routes and redirect unauthenticated users:

 ```javascript 
app.get("/protected-route", (req, res) => {
  // Access user info with req.user
  res.json({ message: "Protected data", user: req.user });
});
```

## Generating and Verifying Tokens

### Generating a JWT token:

 ```javascript 
const { generateToken } = require("auth-passport-jwt");

// secret key is already set from your .env file

const token = generateToken({ userId: "12345" });
```

## Verifying a JWT token:

We automatically set the secret_key to `JWT_SECRET_KEY` from the `.env` file. Make sure to set it under that name.

```javascript
const { verifyToken } = require("auth-passport-jwt");

// secret key is already set from your .env file

const payload = verifyToken(token);
if (payload) {
  // Token is valid
} else {
  // Token is invalid
}
```
