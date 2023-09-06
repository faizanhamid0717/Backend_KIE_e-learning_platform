const express = require('express');
const { ModelAnnouncement } = require('../models/announcement');
const Announcementrouter = express.Router();


// Create a new announcement
Announcementrouter.post('/create', async (req, res) => {
    try {
      const announcement = new   ModelAnnouncement(req.body);
      const savedAnnouncement = await announcement.save();
      res.status(201).json(savedAnnouncement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Get a list of all announcements
  Announcementrouter.get('/', async (req, res) => {
    try {
      const announcements = await   ModelAnnouncement.find();
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update an announcement by ID
  Announcementrouter.put('/update/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedAnnouncement = await   ModelAnnouncement.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedAnnouncement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Delete an announcement by ID
  Announcementrouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await   ModelAnnouncement.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = {Announcementrouter};