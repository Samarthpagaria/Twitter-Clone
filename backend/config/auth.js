import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
  path: "../config/.env",
});

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // Verify the token using the secret
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decode.userid;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid token, authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;
