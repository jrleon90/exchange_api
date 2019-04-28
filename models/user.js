const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: [true, 'NO_FIRSTNAME'], lowercase: true },
  last_name: { type: String, required: [true, 'NO_LASTTNAME'], lowercase: true },
  email: {
    type: String, required: [true, 'NO_EMAIL_FOUND'], lowercase: true, unique: [true, 'EMAIL_EXISTS'],
  },
  password: { type: String, required: [true, 'NO_PASSWORD'] },
});

module.exports = mongoose.model('User', userSchema);
