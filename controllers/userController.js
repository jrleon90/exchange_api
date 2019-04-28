const bcrypt = require('bcrypt');

const User = require('../models/user');
const JWT = require('../middlewares/jwt');

const createUser = async (req, res) => {
  try {
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) { return res.status(403).json({ Error: 'Incomplete data' }); }

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await User.create(user);
    return res.status(200).json({
      Response: `Welcome ${req.body.first_name}!`,
      token: await JWT.createToken(user),
    });
  } catch (err) {
    return res.status(500).json({ Error: err });
  }
};

const logInUser = async (req, res) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.split(/\s+/).pop() || '';
    // eslint-disable-next-line new-cap
    const auth = new Buffer.from(token, 'base64').toString();
    const parts = auth.split(/:/);

    const user = await User.findOne({ email: parts[0] });

    if (user !== null) {
      if (bcrypt.compareSync(parts[1], user.password)) {
        return res.status(200).json({
          Response: 'Log In Successful',
          token: await JWT.createToken(user),
        });
      }
      return res.status(403).json({
        Response: 'Wrong password',
      });
    }
    return res.status(403).json({
      Response: 'User not found',
    });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

module.exports = {
  createUser,
  logInUser,
};
