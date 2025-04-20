// models/FortuneTypeConfig.js

import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },                // Soru metni
  key: { type: String, required: true },                  // Form için field adı (örn: relationship)
  options: [{ type: String, required: true }],            // Dropdown seçenekleri
  required: { type: Boolean, default: true }              // Zorunlu mu?
});

const FortuneTypeConfigSchema = new mongoose.Schema({
  fortuneType: {
    type: String,
    enum: ['Coffee', 'Tarot', 'Palm'],
    required: true,
    unique: true
  },
  questions: [QuestionSchema]
});

export default mongoose.model('FortuneTypeConfig', FortuneTypeConfigSchema);
