import express from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
const router = express.Router();
// Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});
// Create initial admin (only for first setup)
router.post('/setup', async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount > 0) {
            return res.status(403).json({ message: 'Admin already exists' });
        }
        const { username, password } = req.body;
        const admin = new Admin({ username, password });
        await admin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    }
    catch (error) {
        console.error('Setup error:', error);
        res.status(500).json({ message: 'Error creating admin' });
    }
});
export default router;
