import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  let token = req.cookies.token;

  // ✅ Fallback to Authorization header if cookie is not present
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
