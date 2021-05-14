const express = require('express');
const route = express.Router();
const attractionController = require('../controllers/attraction');

route.get('/', attractionController.getAllAttraction);

module.exports = route;