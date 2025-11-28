import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
  // log the whole header for debugging
  //console.log('>>> Incoming Authorization header:', req.headers.authorization);

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - no auth header' });
  }

  // If header is "Bearer <token>", extract the token part
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('>>> Decoded userId:', decoded.userId);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('>>> JWT verify failed:', error.message);
    return res.status(401).json({ message: 'Unauthorized - invalid token' });
  }
};

export default protect;
