import express from 'express';
import * as blogController from '../controllers/blogController.js';
import { body } from 'express-validator';
import { upload } from '../middlewares/multer-config.js';

const router = express.Router();


// Route for creating a new blog with file upload
router.post(
  '/',
  upload.single('image'), // Apply upload middleware here
  [
    body('titre').isLength({ min: 8, max: 100 }),
    body('prix').isNumeric(),
    body('description').isLength({ min: 5, max: 100 }),
    body('lieu').isLength({ min: 5, max: 100 }),
    body('date').isDate(),
  ],
  blogController.createBlog
);

// Route for getting all blogs
router.get('/', blogController.getAllBlogs);

// Routes for getting, updating, and deleting a specific blog
router.route('/:blog')
  .get(blogController.getBlog)
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);

export default router;
