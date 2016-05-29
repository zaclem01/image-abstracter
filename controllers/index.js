var express = require('express');
var router = express.Router();

router.use('/searches', require('./searches'));

router.get('/', (req, res) => {
	res.render('index');
});

module.exports = router;