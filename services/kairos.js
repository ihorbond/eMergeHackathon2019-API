const request = require('request');

require('dotenv').config();

class Kairos {

    constructor() {
        this.appID = process.env.KAIROS_APP_ID;
        this.key = process.env.KAIROS_KEY;
        this.api = 'https://api.kairos.com/';
        this.galleryName = 'Pitcher';
    }

    async identity(action, img, subjectID) { // action = verify || recognize || enroll || detect

        const payload = {
            "image": img,
            "subject_id": subjectID,
            "gallery_name": this.galleryName
        };
        const options = {
            url: `${this.api}/${action}`,
            headers: {
                'User-Agent': 'request',
                'Content-type': 'application/json',
                'app_id': this.appID,
                'app_key': this.key
            },
            body: JSON.stringify(payload)
        };

        return new Promise((resolve, reject) => {
            request.post(options, (err, res, body) => {
                if (err) {
                    console.log(err);
                }
                console.log("Kairos response: " + body);
                let json = JSON.parse(body);

                if (json.Errors) {
                    resolve({ status: 500, err: json.Errors })
                }
                resolve({ status: 200, data: json })

            });
        })

    }
}
module.exports = Kairos;