const express = require('express');
const Courserouter = express.Router();
// Import the Course model
const { ModelCourse } = require('../models/course');


// Create a new course
Courserouter.post('/create', async (req, res) => {
    try {
      const course = new  ModelCourse(req.body);
      const savedCourse = await course.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get a list of all courses
  Courserouter.get('/', async (req, res) => {
    try {
      const courses = await  ModelCourse.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a course by ID
  Courserouter.put('/update/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedCourse = await  ModelCourse.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a course by ID
  Courserouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await  ModelCourse.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports ={
    Courserouter
  }