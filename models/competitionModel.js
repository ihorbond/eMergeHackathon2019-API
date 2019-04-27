const mongoose = require('mongoose');

const competitionModel = new mongoose.Schema({
    totalContributions: { type: Number, default: 0 },
    totalInvestors: { type: Number, default: 0 },
    date: { type: Date, default: new Date() }
});

const CompetitionModel = mongoose.model('Competition', competitionModel);

module.exports = CompetitionModel;