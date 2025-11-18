const express = require('express');
const { getSignup, getSignin, postSignup } = require('../controllers/user.controllers');
const router = express.Router()

router.get('/signup',getSignup);
router.post('/signup',postSignup);

router.get('/signin', getSignin);
router.post('/signin', postSignup);

module.exports = router