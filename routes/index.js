const express = require('express');
const multer = require('multer');
const Slide = require('../models/Slide');
const router = express.Router();

// Set up Multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const slides = await Slide.find();
  res.render('index', { slides });
});

router.post('/upload', upload.fields([{ name: 'thumbnail' }, { name: 'slideFile' }]), async (req, res) => {
  const slide = new Slide({
    title: req.body.title,
    thumbnail: {
      data: req.files.thumbnail[0].buffer,
      contentType: req.files.thumbnail[0].mimetype
    },
    slideFile: {
      data: req.files.slideFile[0].buffer,
      contentType: req.files.slideFile[0].mimetype
    }
  });

  await slide.save();
  res.redirect('/');
});

module.exports = router;
