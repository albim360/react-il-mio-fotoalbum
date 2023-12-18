const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkAuth = require('../middlewares/check-auth');


router.post('/signup', async (req, res) => {
    await UserController.signup(req, res);
});

router.post('/login', async (req, res) => {
    await UserController.signin(req, res);
});

router.get('/user', checkAuth, async (req, res) => {
    await UserController.getAuthenticatedUser(req, res);
});

module.exports = router;