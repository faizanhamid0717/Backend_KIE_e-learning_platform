
const express = require('express');
const Stu_router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const auth = require('../middleware/authMiddleware');



// Protected route example
Stu_router.get('/protected', auth, (req, res) => {
  // Access the authenticated user's data using req.user
  res.json({ message: 'You are authenticated', user: req.user });
});

// Student signup
Stu_router.post('/signup', async (req, res) => {
  try {
    const { name, gender, dateOfBirth, email, contactNumber, password } = req.body;

    // Check if the email already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new instructor
    const student = new Student({
      name,
      gender,
      dateOfBirth,
      email,
      contactNumber,
      password: hashedPassword,
    });

    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Student login
Stu_router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the instructor exists
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, student.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { email: student.email, id: student._id },
      'masai', // Replace with your secret key
      { expiresIn: '1h' }
    );
    console.log('token',token)
    res.status(200).json({ token, student });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = Stu_router;
