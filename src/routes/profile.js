// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authentication = require('../middleware/authMiddleware');

router.get('/profile', authentication, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'User not found',
                data: user,
            });
        }
        
        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Successfully fetched user profile',
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: 'Server error. Please try again later.',
            error: err.message, // Optional: Expose the error message to the client
        });
    } 
});

module.exports = router