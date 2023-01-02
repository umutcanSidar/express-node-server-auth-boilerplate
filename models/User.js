import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: ['Username must be', true],
  },
  email: {
    type: String,
    required: ['Email must be', true],
  },
  password: {
    type: String,
    required: ['Password must be', true],
  },
  token: {
    type: String,
  },
  created_date: {
    type: Date,
  },
  last_login: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('User', UserSchema);
