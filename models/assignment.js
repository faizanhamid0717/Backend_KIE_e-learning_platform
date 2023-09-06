const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    assignmentTitle: { type: String, required: true },
    assignmentDescription: { type: String },
    assignmentDueDate: { type: Date },
    assignmentCourse: { type: String, required: true },
}, {
    versionKey: false
});

const ModelAssignment = mongoose.model("assignment", assignmentSchema);

module.exports = {
    ModelAssignment
};