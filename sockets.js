module.exports = (io) => {

    const PitchModel = require('./models/pitchModel');

    io.on('connection', socket => {
        console.log("sockets connected");

        socket.on('like', (data) => {
            updateModel(data.id, true);
        });

        socket.on('dislike', (data) => {
            updateModel(data.id, false);
        });
    });

    updateModel = (pitchId, upvote) => {
        PitchModel.findById(pitchId, (err, thePitch) => {
            if (err) {
                return;
            }
            thePitch.likes = upvote ? thePitch.likes + 1 : thePitch.likes - 1;
            if (thePitch.likes < 0)
                thePitch.likes = 0;
            console.log(thePitch);
            thePitch.save(err => {
                if (err) {
                    console.log(err);
                    return;
                }
                emitUpdate();
            });
        });

    };

    emitUpdate = () => {
        PitchModel.find((err, thePitches) => {
            if (err)
                console.log(err);
            io.emit('message', thePitches);
        });
    };

};