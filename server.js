import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { notFoundError } from './middlewares/error-handler.js';
import blogRoutes from './routes/blog.js';
import reclamationRoutes from './routes/reclamation.js';
import userRoutes from './routes/user.js'


const app = express();
const port = process.env.PORT || 9098;
const databaseName = process.env.DB_NAME || 'AgriConnect';
const db_url = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

async function connectToDatabase() {
  try {
    await mongoose.connect(`${db_url}/${databaseName}`);
    console.log(`Connected to ${databaseName}`);
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectToDatabase();
app.use('/users', userRoutes)
app.use('/blog', blogRoutes);
app.use('/reclamation', reclamationRoutes);

app.use(notFoundError);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
