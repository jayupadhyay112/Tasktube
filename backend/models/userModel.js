import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String }
});

const user = mongoose.model('userModel', userSchema);
export default user;