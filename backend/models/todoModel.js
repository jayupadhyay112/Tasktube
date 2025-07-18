import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todo: { type: String },
  isCompleted: { type: Boolean },
  dueDate: { type: Date, required: true },
  week: { type: Number, required: true }, // 1, 2, 3, 4
  userId: { type: mongoose.Types.ObjectId, ref: 'userModel' }
});

const todo = mongoose.model('todoModel', todoSchema);
export default todo;