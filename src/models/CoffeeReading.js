// models/CoffeeReading.js

import mongoose from 'mongoose';
import BaseReadingSchema from './BaseReading.js';

const CoffeeReadingSchema = new mongoose.Schema({
  uploadedImagePaths: {
    type: [String],
    validate: [
      {
        validator: arr => arr?.length >= 1,
        message: 'En az 1 görsel gerekli.'
      },
      {
        validator: arr => arr?.length <= 3,
        message: 'En fazla 3 görsel yüklenebilir.'
      }
    ],
    required: true
  },
  answers: {
    type: Map,
    of: String,
    required: true
  }
});

CoffeeReadingSchema.add(BaseReadingSchema);

export default mongoose.model('CoffeeReading', CoffeeReadingSchema);
