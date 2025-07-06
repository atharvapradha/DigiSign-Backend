import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // 🔍 Debug: Log cookies and headers
  console.log("🔍 All Cookies:", req.cookies);
  console.log("🔍 Authorization Header:", req.headers.authorization);

  // ✅ First try token from cookie
  let token = req.cookies.token;

  // ✅ Then fallback to Authorization header if cookie not found
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // ❌ If still no token
  if (!token) {
    console.warn("⚠️ No token found in cookies or Authorization header");
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use env in real projects
    console.log("✅ Decoded token payload:", decoded);

    // ✅ Attach user ID to request
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
