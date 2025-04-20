// models/TarotReading.js

import mongoose from 'mongoose';
import BaseReadingSchema from './BaseReading.js';

const TarotReadingSchema = new mongoose.Schema({
  selectedCards: {
    type: [String],  // ["The Fool", "The Tower", "The Star"]
    required: true,
    validate: {
      validator: arr => arr.length > 0,
      message: 'En az bir kart seçmelisiniz.'
    }
  }
});

TarotReadingSchema.add(BaseReadingSchema);

export default mongoose.model('TarotReading', TarotReadingSchema);
