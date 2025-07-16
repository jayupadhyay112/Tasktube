import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import AuthRoutes from './routes/auth.js';
import ChatRoutes from './routes/chat.js';
import ItemsRoutes from './routes/items.js';
import tokenRoutes from './middleware/token.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRoutes);
app.use('/api/chat', ChatRoutes);
app.use('/api/items', tokenRoutes, ItemsRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
