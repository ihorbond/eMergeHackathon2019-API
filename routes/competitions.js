'use strict';
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const CompetitionModel = require('../models/competitionModel');

router.get('/:id', (req, res, next) => {
    const id = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    CompetitionModel.findById(id, (err, theCompetition) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json({ data: theCompetition });
    });
});


router.post('/add', (req, res, next) => {
    const theCompetition = new CompetitionModel();

    theCompetition.save(err => {
        if (err) {
            res.json(err);
            return;
        }
    });

    res.json({ status: 200, message: 'Competition Added', data: thePitch });
});

module.exports = router;
