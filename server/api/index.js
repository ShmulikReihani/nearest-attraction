const express = require('express');
const router = express.Router();

router.use('/attraction', require('../routes/attraction'));

module.exports = router;