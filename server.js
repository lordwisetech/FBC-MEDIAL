require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Slide = require('./models/Slides');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Set up EJS
app.set('view engine', 'ejs');

// Set up body parser
app.use(express.urlencoded({ extended: true }));

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to display the upload form
app.get('/upload', (req, res) => {
    res.render('index');  // Renders the upload form
});

// Route to handle file upload
app.post('/upload', upload.fields([{ name: 'image' }, { name: 'slide' }]), async (req, res) => {
    const { title } = req.body;
    const image = req.files['image'][0];
    const slide = req.files['slide'][0];

    const newSlide = new Slide({
        title,
        image: {
            data: image.buffer,
            contentType: image.mimetype
        },
        slide: {
            data: slide.buffer,
            contentType: slide.mimetype
        }
    });

    await newSlide.save();
    res.redirect('/');
});

// Route to display all slides
app.get('/', async (req, res) => {
    const slides = await Slide.find({});
    res.render('slides', { slides });  // This is now your home page
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
