'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PitchModel = require('../models/pitchModel');
const upload = require('../configs/multer');
const Kairos = require('../services/kairos');
const image2base64 = require('image-to-base64');


router.get('/', (req, res, next) => {
    PitchModel.find((err, thePitches) => {
        if (err) {
            res.json(err);
            return;
        }

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
        if (err) {
            res.json(err);
            return;
        }

        res.json({ data: thePitch });
    });
});

router.post('/add', upload.single('file'), async (req, res, next) => {

    let picture;
    if (req.file) {
        //verify no faces
        //await image2base64(`./public/uploads/${req.file.filename}`)
        //    .then(
        //        async (response) => {
        //            let kairosResponse = await new Kairos().identity('detect', response, null);
        //            console.log(kairosResponse);

        //            if (kairosResponse.status === 200 && kairosResponse.data.images.faces.length > 0) {
        //                res.status(400).json({ message: 'Images containing faces are not allowed' });
        //                return;
        //            }

        //            picture = `../public/uploads/${req.file.filename}`;
        //        }
        //    )
        //    .catch(
        //        (error) => {
        //            console.log(error); //Exepection error....
        //        }
        //);

        picture = `../public/uploads/${req.file.filename}`;
    }
    else {
        picture = './public/images/default.jpg';
    }


    const thePitch = new PitchModel({
        userId: req.body.userId,
        email: req.body.email,
        title: req.body.title,
        titlePic: picture,
        description: req.body.description,
        tags: req.body.tags
    });

    thePitch.save(err => {
        if (err) {
            res.json(err);
            return;
        }
    });

    res.json({ status: 200, message: 'Pitch Added', data: thePitch });
});

module.exports = router;