/* Updated server entry (server/index.ts) to use dynamic import for ES modules */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import tourRoutes from './routes/tours.js';
import authRoutes from './routes/auth.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
// Routes
app.use('/api/tours', tourRoutes);
app.use('/api/auth', authRoutes);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/tour_app")
    .then(() => {
    console.log('Connected to MongoDB');
    // Start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
// Error handling
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});
