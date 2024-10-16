// routes/users.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { MongoClient, ObjectId } = require('mongodb');
const authentication = require('../middleware/authMiddleware');

// Create a new user
router.post('/students', authentication, async (req, res) => {
  try {
    // Create a new student instance from the request body
    const student = new Student(req.body);

    // Save the student instance to the database
    await student.save();

    // Respond with a 201 status and a structured JSON response
    res.status(201).json({
      success: true,
      message: 'Student successfully created',
      data: student,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error creating student:', err.message);

    // Send a 400 response with a meaningful error message
    res.status(400).json({
      success: false,
      message: 'Failed to create student. Please check your input.',
      error: err.message, // Optional: Expose the error message to the client
    });
  }
});

// Get all student
router.get('/students', authentication, async (req, res) => {
  try {
    const student = await Student.find();
    res.json({
      statusCode: 200,
      message: "success",
      data: student
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: err.message, // Optional: Expose the error message to the client
    });
  }
});

router.get('/students/:id', authentication, async (req, res) => {
  const studentId = req.params.id;

  try {

    // Convert the ID to ObjectId before querying
    const student = await Student.findOne({ _id: ObjectId.createFromHexString(studentId) });

    if (!student) {
      return res.send({
        success: false,
        statusCode: 404,
        message: 'Student not found',
        data: student,
      });
    }

    res.send({
      success: true,
      statusCode: 200,
      message: 'Student found successfully',
      data: student,
    });
    
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).send({
      success: false,
      statusCode: 500,
      message: 'Internal Server Error',
      error: err.message,
    });
  }

});

// Get all student
router.get('/students', authentication, async (req, res) => {
  try {
    const student = await Student.find();
    res.json({
      statusCode: 200,
      message: "success",
      data: student
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: err.message, // Optional: Expose the error message to the client
    });
  }
});

// Export the router
module.exports = router;
