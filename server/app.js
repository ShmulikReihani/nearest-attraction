require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV == ! 'production') {
    app.use(express.static(path.join(__dirname + '/client/public/index.html')));
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname + '/client/public/index.html')));
    console.log('Client is Live');
}

app.get('/', (req, res) => {
    res.json('CONNECTED!!!')
})

app.use('/api', require('./api/index'))

app.listen(port, err => {
    if (err) console.log(err);
    console.log(`You are connected to: http://localhost:${port}/`);
});