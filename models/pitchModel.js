const mongoose = require('mongoose');

const pitchSchema = new mongoose.Schema({
    userId: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true, maxlength: 15 },
    title: { type: String, required: true, trim: true },
    titlePic: { type: String, default: '../public/images/default.jpg' },
    description: { type: String, trim: true, maxlength: 500 },
    likes: { type: Number, default: 0 },
    tags: { type: [String] }
});

const PitchModel = mongoose.model('Pitch', pitchSchema);

module.exports = PitchModel;