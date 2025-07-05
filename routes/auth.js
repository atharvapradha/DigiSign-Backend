import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // ✅ Check if user already exists by email or username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ msg: 'Account already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    const payload = { userId: newUser._id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    // ✅ Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('❌ Registration error:', err.message);
    res.status(500).send('Server error');
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials (email)' });

    if (username && user.username !== username) {
      return res.status(400).json({ msg: 'Invalid credentials (username mismatch)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials (password)' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    // ✅ Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).send('Server error');
  }
});

export default router;
