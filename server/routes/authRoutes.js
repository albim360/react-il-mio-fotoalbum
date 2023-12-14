const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
    await UserController.signup(req, res);
});

router.post('/login', async (req, res) => {
    await UserController.signin(req, res);
});

module.exports = router;