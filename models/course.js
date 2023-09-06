const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseName: { type: String, required: true },
  
    department: { type: String, enum: ["Science", "Arts", "Engineering"], required: true },
    credits: { type: Number },
    description: { type: String },
    instructor:{type:String}
}, {
    versionKey: false
});

const ModelCourse = mongoose.model("course", courseSchema);

module.exports = {
    ModelCourse
};