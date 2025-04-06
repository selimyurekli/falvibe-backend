// --- START OF FILE models/Reading.js ---
import mongoose from 'mongoose';

const ReadingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fortuneTeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FortuneTeller',
    required: true,
    index: true
  },
  fortuneType: {
    type: String,
    required: true,
    enum: ['Tarot', 'Coffee', 'Palm'],
    index: true
  },
  errorDetails: {
      type: String
  }
}, { timestamps: true });

export default mongoose.model('Reading', ReadingSchema);
