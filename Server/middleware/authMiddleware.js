const jwt = require("jsonwebtoken");

// This middleware function runs BEFORE your route handler
module.exports = function (req, res, next) {
  // 1. Get the token from the header
  const token = req.header("token");

  // 2. Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "Access Denied! No token provided." });
  }

  try {
    // 3. Verify the token
    // If valid, it returns the payload data (id, role) we put inside
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "HackathonSecretKey123"
    );

    // 4. Attach the user data to the request object
    // This allows the next function to know WHO is logged in
    req.user = verified;

    // 5. Allow the request to proceed
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid Token" });
  }
};
