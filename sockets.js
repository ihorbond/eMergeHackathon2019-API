module.exports = (io) => {

    const mongoose = require('mongoose');
    const PitchModel = require('./models/pitchModel');
    //const tvIP = process.env.TV_IP_ADDRESS;
    //const tvPSK = process.env.TV_PSK_KEY;

    io.on('connection', socket => {
        console.log("sockets connected");

        socket.on('like', (data) => {
            const pitchId = data.pitchId;
            const userId = data.userId;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                res.status(400).json({ message: 'Specified id is not valid' });
                return;
            }
            PitchModel.findById(userId, (err, thePitch) => {
                if (err) {
                    res.json(err);
                    return;
                }
                thePitch.likes++;
                thePitch.save(err => {
                    if (err) {
                        res.json(err);
                        return;
                    }
                    res.json({ message: 'Changes Saved', pitch: thePitch });
                });
            });
        });

        socket.on('dislike', (data) => {
            const pitchId = data.pitchId;
            const userId = data.userId;
        });
    });
}