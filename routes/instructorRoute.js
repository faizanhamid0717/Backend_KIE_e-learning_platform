const express = require('express');
const Ins_router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Instructor = require('../models/instructor');
const auth = require('../middleware/authMiddleware');



// Protected route example
Ins_router.get('/protected', auth, (req, res) => {
  // Access the authenticated user's data using req.user
  res.json({ message: 'You are authenticated', user: req.user });
});
// Instructor signup
Ins_router.post('/signup', async (req, res) => {
  try {
    const { name, gender, dateOfBirth, department, email, contactNumber, password } = req.body;

    // Check if the email already exists
    const existingInstructor = await Instructor.findOne({ email });

    if (existingInstructor) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new instructor
    const instructor = new Instructor({
      name,
      gender,
      dateOfBirth,
      department,
      email,
      contactNumber,
      password: hashedPassword,
    });

    await instructor.save();

    res.status(201).json({ message: 'Instructor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Instructor login
Ins_router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the instructor exists
    const instructor = await Instructor.findOne({ email });

    if (!instructor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, instructor.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { email: instructor.email, id: instructor._id },
      'masai', // Replace with your secret key
      { expiresIn: '1h' }
    );
    console.log('token',token)
    res.status(200).json({ token, instructor });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = Ins_router;
