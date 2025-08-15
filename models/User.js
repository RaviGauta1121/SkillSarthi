import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Not required for social logins
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials',
  },
  providerId: {
    type: String,
  },
  emailVerified: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Prevent re-compilation of model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;