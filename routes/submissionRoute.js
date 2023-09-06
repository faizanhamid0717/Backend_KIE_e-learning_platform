

const express = require('express');
const Sub_router = express.Router();
const Submission = require('../models/submission'); // Import the Submission model


// Create a new submission
Sub_router.post('/', async (req, res) => {
    try {
      const submission = new Submission(req.body);
      const savedSubmission = await submission.save();
      res.status(201).json(savedSubmission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get a list of all submissions
  Sub_router.get('/', async (req, res) => {
    try {
      const submissions = await Submission.find();
      res.status(200).json(submissions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a submission by ID
  Sub_router.put('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedSubmission = await Submission.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedSubmission);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a submission by ID
  Sub_router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Submission.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = Sub_router;
  