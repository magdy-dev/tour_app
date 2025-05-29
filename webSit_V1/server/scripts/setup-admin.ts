import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

async function setupAdmin() {
  try {
    const MONGODB_URI = process.env.MONGO_URI!;
    if (!MONGODB_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      console.log('Admin account already exists');
      process.exit(0);
    }

    // Create admin account
    const admin = new Admin({
      username: 'marko',
      password: 'marko' // This will be hashed automatically
    });

    await admin.save();
    console.log('Admin account created successfully');
    console.log('Username: marko');
    console.log('Password: marko');
    console.log('Please change these credentials after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin:', error);
    process.exit(1);
  }
}

setupAdmin(); 