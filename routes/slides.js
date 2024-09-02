// backend/routes/slides.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Slide = require('../models/Slide');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Rename the file to include the date for uniqueness
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST /api/slides
// @desc    Submit a new slide
router.post('/', upload.fields([{ name: 'slideFile' }, { name: 'thumbnail' }]), async (req, res) => {
  try {
    const { title, category, posterName, date } = req.body;
    const slideFile = req.files['slideFile'][0].path;
    const thumbnail = req.files['thumbnail'][0].path;

    const newSlide = new Slide({
      title,
      category,
      posterName,
      date: date || Date.now(),
      slideFile,
      thumbnail,
    });

    await newSlide.save();
    res.status(201).json({ message: 'Slide submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/slides
// @desc    Get all slides
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find().sort({ date: -1 });
    res.json(slides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
