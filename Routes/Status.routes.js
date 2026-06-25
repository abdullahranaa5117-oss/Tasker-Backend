const express = require('express');
const router = express.Router();
const StatusController = require('../controller/Status.controller');

router.get('/',StatusController.getStatus);
router.post('/',StatusController. createnewStatus);
router.put( '/:id',StatusController.updateStatus);
router.delete( '/:id',StatusController.deleteStatus);

module.exports = router;
