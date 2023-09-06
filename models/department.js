

const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }],
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
