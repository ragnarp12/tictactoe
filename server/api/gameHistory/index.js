'use strict';

var express = require('express');
var controller = require('./gameHistory.Controller');
var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.index);
module.exports = router;