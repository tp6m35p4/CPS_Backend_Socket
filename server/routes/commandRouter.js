var express = require('express');
var router = express.Router();

var commandController = require('../controllers/commandController');
router.get('/', function(req, res, next) {
    res.json({
        msg:"alive"
    })
})
router.post('/:command', commandController.index);

module.exports = router;
