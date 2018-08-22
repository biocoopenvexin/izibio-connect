var express = require('express');
var router = express.Router();

var adherent_controller = require('../controllers/adherentController');

router.get('/adherents', adherent_controller.adherent_list);

module.exports = router;
