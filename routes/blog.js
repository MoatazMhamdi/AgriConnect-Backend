import express from 'express';
import * as blogController from '../controllers/blog.js';
import { body } from 'express-validator';
import upload from '../middlewares/multer-config.js';

const router = express.Router();

router.route('/')
  .post(
    upload,
    body('titre').isLength({ min: 8, max: 100 }),
    body('prix').isNumeric(),
    body('description').isLength({ min: 5, max: 100 }),
    body('lieu').isLength({ min: 5, max: 10 }),
    body('date').isDate(),
    blogController.createBlog
  );

  router.route('/:blog')
  .get(blogController.getBlog)
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);
export default router;
