import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends mongoose.Document {
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error instanceof Error ? error : new Error('Error hashing password'));
  }
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Error comparing passwords');
  }
};

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
export { Admin }; 