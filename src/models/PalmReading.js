// models/PalmReading.js

import mongoose from 'mongoose';
import BaseReadingSchema from './BaseReading.js';

const PalmReadingSchema = new mongoose.Schema({
  uploadedImagePaths: {
    type: [String],
    required: true,
    validate: [
      {
        validator: arr => arr.length >= 1,
        message: 'En az bir el fotoğrafı yüklenmeli.'
      },
      {
        validator: arr => arr.length <= 3,
        message: 'En fazla 3 fotoğraf yüklenebilir.'
      }
    ]
  }
});

PalmReadingSchema.add(BaseReadingSchema);

export default mongoose.model('PalmReading', PalmReadingSchema);
