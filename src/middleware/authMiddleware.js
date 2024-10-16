const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Token format is incorrect.',
    });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Attach the decoded payload to the request object (e.g., user data)
    req.user = decoded;

    // Call next middleware or route handler
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

module.exports = authMiddleware;
