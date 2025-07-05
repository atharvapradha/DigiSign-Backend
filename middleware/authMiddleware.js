import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // 🔍 Debug: Log cookies
  console.log("🔍 All Cookies:", req.cookies);

  // ✅ Read token from cookies
  const token = req.cookies.token;

  // 🔍 Debug: Log token value
  console.log("🔐 Received JWT token from cookie:", token);

  if (!token) {
    console.warn("⚠️ No token found in cookies");
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use env in real apps
    console.log("✅ Decoded token payload:", decoded);

    // ✅ Attach the user ID as req.user.id
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
