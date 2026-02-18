const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/submission.controller');

// POST /api/submit 
router.post('/submit', submitForm);

module.exports = router;
