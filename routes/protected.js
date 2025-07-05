import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

// Make sure you have an authMiddleware that verifies JWT!

const router = express.Router();

// Example protected route: GET /api/dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to the protected dashboard!',
    user: req.user // Assuming authMiddleware attaches user info to req.user
  });
});

// You can add more protected routes here!
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'This is your protected profile page',
    user: req.user
  });
});

export default router;
//USE of the above  code
// ✔ Creates an Express router with protected routes (GET /dashboard and GET /profile).
// ✔ Uses authMiddleware to verify JWT tokens before allowing access to the routes.
// ✔ Returns JSON responses containing a message and user info (from req.user) for authenticated requests.
// ✔ Demonstrates how to create protected API endpoints that require valid authentication.
