const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.get('/dashboard', authMiddleware, authController.getDashboard);

module.exports = router;