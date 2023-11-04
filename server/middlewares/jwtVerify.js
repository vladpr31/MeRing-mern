const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  // Get the JWT token from the request, e.g., from an HTTP header
  const token = req.headers.authorization.split("Bearer ")[1];
  // Check if a token is provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token not provided." });
  }

  // Verify the token's signature with your secret key
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // If the access token is expired or invalid, try verifying the refresh token
      const refreshToken = req.headers.authorization; // Assuming you store the refresh token in a cookie
      console.log("JWT EXPIRED", err.message);
      // Verify the refresh token (you need to implement this function)
      if (!verifyRefreshToken(refreshToken)) {
        return res.status(401).json({ message: "JWT REFRESH TOKEN EXPIRED" });
      }

      // Generate a new access token and refresh token
      const newAccessToken = authController.generateJWTAccessToken(
        decoded.user
      ); // Assuming you can extract user info from the decoded access token
      const newRefreshToken = authController.generateJWTRefreshToken(
        decoded.user
      );

      // Set the new access token as a response header
      res.header("Authorization", `Bearer ${newAccessToken}`);

      // Set the new refresh token in a cookie
      res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

      // Continue processing the request with the new access token
      req.user = decoded.user; // Update the user info in the request object
      next();
    } else {
      // The access token is valid; you can access user information from the decoded payload
      req.user = decoded.user; // Assuming you can extract user info from the decoded access token
      next();
    }
  });
};
const verifyRefreshToken = (refreshToken) => {
  try {
    // Verify the refresh token using your refresh token secret key
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );

    // Check if the refresh token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp <= currentTimestamp) {
      // Refresh token has expired
      return false;
    }

    // The refresh token is valid
    return true;
  } catch (error) {
    // An error occurred while verifying the token (e.g., token is invalid)
    return false;
  }
};

module.exports = verifyToken;
