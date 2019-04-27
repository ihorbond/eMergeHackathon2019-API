'use strict';
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const PitchModel = require('../models/pitchModel');
const upload = require('../configs/multer');

//var multer = require('multer');
//var upload = multer({ dest: '../uploads/' });

router.get('/', (req, res, next) => {
    PitchModel.find((err, thePitches) => {
        if (err) res.json(err);

        res.json({ status: 200, data: thePitches });
    });

});

router.get('/:id', function (req, res, next) {
    const pitchId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(pitchId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    PitchModel.findById(pitchId, (err, thePitch) => {
        if (err) res.json(err);

        res.json({ pitch: thePitch });
    });
});

router.post('/add', upload.single('file'), (req, res, next) => {
    //if (req.user.cards.length >= 3) {
    //    res.json({ message: "Sorry, you have reached the limit of 3 cards. Delete other cards first or upgrade storage limit" });
    //    return;
    //}
    console.log(req.file);

    let picture = req.file ? `../uploads/${req.file.filename}` : '../public/images/default.jpg';

    const thePitch = new PitchModel({
        userId: req.body.userId,
        email: req.body.email,
        title: req.body.title,
        titlePic: picture,
        description: req.body.description,
        tags: req.body.tags
    });
    //if (!theCard.fullName || !theCard.email) {
    //    res.json({ message: "Both Name and Email fields must be filled out" });
    //    return;
    //}

    thePitch.save(err => {
        if (err) {
            res.json(err);
            return;
        }
    });

    res.json({ status: 200, message: 'Pitch Added', data: thePitch });

    //update user's cards Array
    //UserModel.findById(userId, (err, theUser) => {
    //    if (err) {
    //        res.json(err);
    //        return;
    //    }

    //    theUser.cards.push(theCard._id);
    //    theUser.markModified('cards');
    //    theUser.save((err) => {
    //        if (err) {
    //            res.json(err);
    //            return;
    //        }
    //        res.json({ status: 'OK', message: 'Card Added', userInfo: theUser });
    //    });
    //}
    //);
});

module.exports = router;