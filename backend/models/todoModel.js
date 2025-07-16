import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  todo:{type:String},
  isCompleted:{type:Boolean},
  userId:{type: mongoose.Types.ObjectId, ref:'userModel'}
});

const todo = mongoose.model('todoModel', todoSchema);
export default todo;