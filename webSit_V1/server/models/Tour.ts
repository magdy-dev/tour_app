import mongoose from 'mongoose';

export interface ITour extends mongoose.Document {
  type: 'snorkeling' | 'desert' | 'yacht';
  image: string;
  price: number;
  duration: string;
  rating: number;
  features: string[];
  translations: {
    en?: { title?: string; description?: string };
    ar?: { title?: string; description?: string };
    de?: { title?: string; description?: string };
    sr?: { title?: string; description?: string };
    ru?: { title?: string; description?: string };
  };
}

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

const Tour = mongoose.model<ITour>('Tour', tourSchema);
export { Tour }; 