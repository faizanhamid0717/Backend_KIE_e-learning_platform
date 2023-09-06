const express = require('express');
const { ModelAssignment } = require('../models/assignment');
const Asignmentrouter = express.Router();
 // Import the Assignment model


// Create a new assignment
Asignmentrouter.post('/create', async (req, res) => {
    try {
      const assignment = new ModelAssignment(req.body);
      const savedAssignment = await assignment.save();
      res.status(201).json(savedAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get a list of all assignments
  Asignmentrouter.get('/', async (req, res) => {
    try {
      const assignments = await ModelAssignment.find();
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update an assignment by ID
  Asignmentrouter.put('/update/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedAssignment = await ModelAssignment.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedAssignment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete an assignment by ID
  Asignmentrouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await ModelAssignment.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports ={ Asignmentrouter};