import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const router: Router = express.Router();

// TODO: Add rate limiting to /login and enforce strong password policy on /setup

// Admin login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    try {
      // Check password
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );

      res.json({ token });
    } catch (error) {
      console.error('Password comparison error:', error);
      res.status(500).json({ message: 'Error during authentication' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Create initial admin (only for first setup)
router.post('/setup', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    // Check if admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      res.status(403).json({ message: 'Admin already exists' });
      return;
    }

    try {
      const admin = new Admin({ username, password });
      await admin.save();
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      console.error('Admin creation error:', error);
      if (error instanceof Error && error.message.includes('duplicate key')) {
        res.status(400).json({ message: 'Username already exists' });
        return;
      }
      res.status(500).json({ message: 'Error creating admin' });
    }
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Error during setup' });
  }
});

export default router; 