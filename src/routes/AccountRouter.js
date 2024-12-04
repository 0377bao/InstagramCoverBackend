const express = require('express');
const AccountController = require('../controllers/AccountController');

const router = express.Router();

router.post('/create-account', AccountController.createAccount);
router.post('/login-account', AccountController.loginAccount);
router.get('/find-account', AccountController.findAccount);
router.get('/detail-account/:id', AccountController.findDetailAccount);

module.exports = router;
