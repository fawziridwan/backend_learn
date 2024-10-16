// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');

require('dotenv').config();

// Create an express app
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./src/routes/auth');
const studentRouter = require('./src/routes/student');
const profileRouter = require('./src/routes/profile');

// Middleware to parse JSON
app.use(express.json());

app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if you're using HTTPS
    httpOnly: true,
    maxAge: 3600000, // 1 hour
  },
}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send({
    success: true,
    statusCode: 200,
    message: 'Healthy Check',
  });
});

app.use(cors({
  origin: process.env.FRONTEND_URL, // Your frontend server URL
  methods: 'GET,POST,PUT,DELETE',  // HTTP methods you want to allow
  credentials: true,               // Allow cookies and credentials
}));

app.use('/api', studentRouter);
app.use('/api', authRoutes);
app.use('/api', profileRouter);

// Listen on a port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
