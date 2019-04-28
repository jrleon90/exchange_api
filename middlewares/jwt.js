require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = async (user) => {
  try {
    const token = await jwt.sign({
      id: user.id,
    },
    process.env.JWT_ENCRYPTION,
    {
      expiresIn: '1 days',
    });
    return token;
  } catch (err) {
    return err;
  }
};

const decodeToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(403).json({ Message: 'You have no authorization' });

    const token = req.headers.authorization.split(' ')[1];
    const decoded = await jwt.verify(token, process.env.JWT_ENCRYPTION);
    req.decoded = decoded;
    return next();
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
};


module.exports = {
  createToken,
  decodeToken,
};
