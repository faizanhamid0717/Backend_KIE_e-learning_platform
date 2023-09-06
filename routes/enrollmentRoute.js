

const express = require('express');
const Enr_router = express.Router();
const Enrollment = require('../models/enrollment'); // Import the Enrollment model


// Create a new enrollment
Enr_router.post('/', async (req, res) => {
    try {
      const enrollment = new Enrollment(req.body);
      const savedEnrollment = await enrollment.save();
      res.status(201).json(savedEnrollment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get a list of all enrollments
  Enr_router.get('/', async (req, res) => {
    try {
      const enrollments = await Enrollment.find();
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update an enrollment by ID
  Enr_router.put('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedEnrollment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete an enrollment by ID
  Enr_router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Enrollment.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = Enr_router;
  