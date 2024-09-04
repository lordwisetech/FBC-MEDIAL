require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI, )
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const slideSchema = new mongoose.Schema({
  name: String,
  thumbnail: { data: Buffer, contentType: String },
});

const Slide = mongoose.model('Slide', slideSchema);

// Set up EJS
app.set('view engine', 'ejs');

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve static files (for displaying images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', async (req, res) => {
  try {
    const slides = await Slide.find({});
    res.render('index', { slides });
  } catch (error) {
    res.status(500).send('Error fetching slides');
  }
});

app.post('/upload', upload.single('thumbnail'), async (req, res) => {
  const { name } = req.body;
  const { file } = req;

  try {
    const slide = new Slide({
      name,
      thumbnail: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });
    await slide.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error uploading slide');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
