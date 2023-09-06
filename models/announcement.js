const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    announcementTitle: { type: String, required: true },
    announcementDescription: { type: String,required: true },
    announcementDate: { type: Date,required: true },
   
}, {
    versionKey: false
});

const ModelAnnouncement = mongoose.model("announcement", announcementSchema);

module.exports = {
    ModelAnnouncement
};