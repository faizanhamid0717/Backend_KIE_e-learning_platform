const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: String,
  dateOfBirth: Date,
  department: String,
  email: { type: String, required: true, unique: true }, // Make email required and unique
  contactNumber: Number,
  password: { type: String, required: true }, // Add password field
});

const Instructor = mongoose.model('Instructors', instructorSchema);

module.exports = Instructor;
