const express = require('express');
const router = express.Router();
const TaskController = require('../controller/Task.controller');
const { authenticate } = require('../middleware/auth');


router.get('/', authenticate, TaskController.getTask);
router.post('/', authenticate, TaskController.createnewTask);
router.put('/:id', authenticate, TaskController.updateTask);
router.delete('/:id', authenticate, TaskController.deleteTask);

module.exports = router;
