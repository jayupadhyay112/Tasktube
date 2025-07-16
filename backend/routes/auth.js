import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
  return res.status(400).json({ status: 'error', message: 'All fields are required' });
}

  
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.json({ status: 'error', message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
  const userName = newUser.name;
    res.json({ status: 'ok', message: 'Signup successful', token, userName });
  } catch (err) {
   res.status(500).json({ status: 'error', message: err.message });

  }
}); 

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ status: 'error', message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ status: 'error', message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
const userName = user.name
  res.json({ status: 'ok', token, userName });
});

export default router;
