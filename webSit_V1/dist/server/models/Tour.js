import mongoose from 'mongoose';
const tourSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['snorkeling', 'desert', 'yacht'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    features: [{
            type: String,
            required: true
        }],
    translations: {
        en: {
            title: String,
            description: String
        },
        ar: {
            title: String,
            description: String
        },
        de: {
            title: String,
            description: String
        },
        sr: {
            title: String,
            description: String
        },
        ru: {
            title: String,
            description: String
        }
    }
}, {
    timestamps: true
});
// Add indexes for better query performance
tourSchema.index({ type: 1 });
tourSchema.index({ price: 1 });
tourSchema.index({ rating: -1 });
const Tour = mongoose.model('Tour', tourSchema);
export { Tour };
