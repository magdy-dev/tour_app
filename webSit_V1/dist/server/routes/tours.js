import express from 'express';
import { Tour } from '../models/Tour.js';
import NodeCache from 'node-cache';
const router = express.Router();
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes
// Get all tours with caching
router.get('/', async (_req, res) => {
    try {
        const cacheKey = 'all_tours';
        let tours = cache.get(cacheKey);
        if (!tours) {
            tours = await Tour.find().sort({ rating: -1 });
            cache.set(cacheKey, tours);
        }
        res.json(tours);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tours', error });
    }
});
// Get tour by ID with caching
router.get('/:id', async (req, res) => {
    try {
        const cacheKey = `tour_${req.params.id}`;
        let tour = cache.get(cacheKey);
        if (!tour) {
            tour = await Tour.findById(req.params.id);
            if (tour) {
                cache.set(cacheKey, tour);
            }
        }
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        res.json(tour);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tour', error });
    }
});
// Get tours by type with caching
router.get('/type/:type', async (req, res) => {
    try {
        const cacheKey = `tours_type_${req.params.type}`;
        let tours = cache.get(cacheKey);
        if (!tours) {
            tours = await Tour.find({ type: req.params.type }).sort({ rating: -1 });
            cache.set(cacheKey, tours);
        }
        res.json(tours);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tours by type', error });
    }
});
// Create new tour (admin only)
router.post('/', async (req, res) => {
    try {
        const tour = new Tour(req.body);
        await tour.save();
        cache.del('all_tours'); // Invalidate cache
        res.status(201).json(tour);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating tour', error });
    }
});
// Update tour (admin only)
router.put('/:id', async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        // Invalidate relevant caches
        cache.del('all_tours');
        cache.del(`tour_${req.params.id}`);
        cache.del(`tours_type_${tour.type}`);
        res.json(tour);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating tour', error });
    }
});
// Delete tour (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        if (!tour) {
            return res.status(404).json({ message: 'Tour not found' });
        }
        // Invalidate relevant caches
        cache.del('all_tours');
        cache.del(`tour_${req.params.id}`);
        cache.del(`tours_type_${tour.type}`);
        res.json({ message: 'Tour deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting tour', error });
    }
});
export default router;
