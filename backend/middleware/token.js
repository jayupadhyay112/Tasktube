import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Example format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded payload to the request
    next(); // Continue to route
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
