

const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  submissionDate: Date,
  status: String,
  remarks: String,
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
