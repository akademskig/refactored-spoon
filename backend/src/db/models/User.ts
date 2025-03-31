import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model('User', userSchema);
