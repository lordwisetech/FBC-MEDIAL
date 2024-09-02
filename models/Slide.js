// backend/models/Slide.js
const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ['Normal Program', 'Wedding Anniversary', 'Thanksgiving', 'Royal Ambassador Week', 'Lydia Week', 'Health Week'],
    default: 'Normal Program',
  },
  posterName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  slideFile: { type: String, required: true }, // Path to the uploaded slide
  thumbnail: { type: String, required: true },  // Path to the thumbnail image
});

module.exports = mongoose.model('Slide', SlideSchema);
