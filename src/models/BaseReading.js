// models/BaseReading.js

import mongoose from 'mongoose';

const BaseReadingSchema = new mongoose.Schema({
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
    enum: ['Coffee', 'Tarot', 'Palm'],
    required: true,
    index: true
  },
  fortuneText: {
    type: String,
    required: true
  },
  generatedImagePath: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export default BaseReadingSchema;
