import mongoose from 'mongoose';

const FortuneTellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Fortune teller name is required.'],
    trim: true,
    unique: true
  },
  fortuneType: {
    type: String,
    required: [true, 'Fortune type is required.'],
    enum: ['Tarot', 'Coffee', 'Palm'],
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  prompt: {
    type: String,
    required: [true, 'AI prompt is required.']
  },
  modelIdentifier: {
      type: String,
      default: 'default-gpt'
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  creditCost: {
    type: Number,
    required: function() { return this.isPaid; },
    default: 0,
    min: [0, 'Credit cost cannot be negative.']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  inputRequirements: {
      type: String,
      trim: true
  },
  modelSettings: {
      temperature: { type: Number, default: 0.7 },
      maxTokens: { type: Number, default: 500 }
  }

}, { timestamps: true });

export default mongoose.model('FortuneTeller', FortuneTellerSchema);
