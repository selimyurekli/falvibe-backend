import mongoose from 'mongoose';

const File = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  url: {
    type: String,
    required: true
  },
  originalName: {
    type: String
  },
  mimeType: {
    type: String
  },
  size: {
    type: Number // byte cinsinden
  },
  usedInModel: {
    type: String,
    enum: ['CoffeeReading', 'TarotReading', 'PalmReading']
  }
}, { timestamps: true });

export default mongoose.model('File', File);
