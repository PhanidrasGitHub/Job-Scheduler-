const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.post('/', jobController.createJob);
router.get('/', jobController.getAllJobs);
router.post('/run/:id', jobController.runJob);

module.exports = router;