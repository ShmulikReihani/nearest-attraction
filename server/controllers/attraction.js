const fs = require('fs');

let attractionData = [];

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    attractionData = JSON.parse(data);
})

exports.getAllAttraction = (req, res, next) => {

    return res.status(200).json(attractionData)
}


