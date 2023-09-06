

const express = require('express');
const Depart_router= express.Router();
const Department = require('../models/department'); // Import the Department model


// Create a new department
Depart_router.post('/', async (req, res) => {
    try {
      const department = new Department(req.body);
      const savedDepartment = await department.save();
      res.status(201).json(savedDepartment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get a list of all departments
  Depart_router.get('/', async (req, res) => {
    try {
      const departments = await Department.find();
      res.status(200).json(departments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update a department by ID
  Depart_router.put('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedDepartment = await Department.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedDepartment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete a department by ID
  Depart_router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Department.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = Depart_router;
  