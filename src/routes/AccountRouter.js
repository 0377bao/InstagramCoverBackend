const express = require('express');
const AccountController = require('../controllers/AccountController');

const router = express.Router();

router.post('/create-account', AccountController.createAccount);
router.get('/find-account', AccountController.findAccount);

module.exports = router;
