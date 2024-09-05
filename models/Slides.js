// models/Slide.js
const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
    title: String,
    image: {
        data: Buffer,
        contentType: String
    },
    slide: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Slide', SlideSchema);
