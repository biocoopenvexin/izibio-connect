var express = require('express');
var router = express.Router();

var caismois_controller = require('../controllers/caismoisController');

router.get('/caismois', caismois_controller.caismois_list);

module.exports = router;
