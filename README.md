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
## Usage

### Initializing Passport JWT Authentication

To initialize Passport with JWT authentication in your Express application:

 ```javascript 
const express = require("express");
const initPassportAuth = require("auth-passport-jwt").initPassportAuth;

const app = express();
const secretKey = process.env.JWT_SECRET_KEY; // Ensure this is set in your environment

initPassportAuth(app, secretKey);

// Define routes...
```


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

const token = generateToken({ userId: "12345" }, secretKey);
```

## Verifying a JWT token:

```
const { verifyToken } = require("auth-passport-jwt");

const payload = verifyToken(token, secretKey);
if (payload) {
  // Token is valid
} else {
  // Token is invalid
}
```
