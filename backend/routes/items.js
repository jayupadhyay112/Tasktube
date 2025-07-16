import express from 'express';
import Todo from '../models/todoModel.js';

const router = express.Router();

// ✅ GET all todos (optionally by user)
router.get('/', async (req, res) => {
  try {
    // If you're using auth, replace this with: req.user.id
    const todos = await Todo.find({userId:req.user.id}); // or add filter: { userId: req.user.id }
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// ✅ POST a new todo
router.post('/', async (req, res) => {
  console.log("olokoklo--->",req.body.task);
  
  try {
    const newItem = new Todo({
      todo: req.body.task,      // Make sure this matches the frontend
      isCompleted: false,
      userId: req.user.id    // optional: if using user auth
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save todo' });
  }
});

// ✅ DELETE a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);  // ✅ fixed from Item → Todo
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// ✅ PUT toggle complete
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

export default router;
