// controllers/blog.js
import Blog from '../models/blog.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export function createBlog(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { titre, description, lieu, date, prix } = req.body;

  let image;

  if (req.file) {
    image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }

  const newBlog = new Blog({
    titre,
    description,
    lieu,
    image,
    date,
    prix,
    jAime: 0,
    sauvegarde: 0,
    dislike: 0,
  });
  newBlog.save()
    .then(savedBlog => {
      res.status(201).json(savedBlog);
    })


    .catch(error => {
      res.status(400).json({ error: error.message });
    });
}
    export function getBlog(req, res) {
      const blogId = req.params.blog;
    
      Blog.findById(blogId)
        .then(blogData => {
          if (!blogData) {
            return res.status(404).json({ message: 'Blog not found' });
          }
          res.status(200).json(blogData);
        })
        .catch(error => {
          res.status(400).json({ error: error.message });
        });
    }
  
    export function updateBlog(req, res) {
      const blogId = req.params.id;
    
      // Convertir l'ID en un objet ObjectId valide
      const isValidId = mongoose.Types.ObjectId.isValid(blogId);
      if (!isValidId) {
        return res.status(400).json({ error: 'Invalid blog ID' });
      }
    
      Blog.findOneAndUpdate(
        { "_id": blogId },
        {
          titre: req.body.titre,
          description: req.body.description,
          lieu: req.body.lieu,
          image: req.body.image,
          date: req.body.date,
          prix: req.body.prix,
       
        },
        { new: true }
      )
        .then(updatedBlog => {
          if (updatedBlog) {
            res.status(200).json({ msg: "Blog modifié avec succès", blog: updatedBlog });
          } else {
            res.status(404).json({ error: "Blog introuvable." });
          }
        })
        .catch(error => {
          res.status(400).json({ error: error.message });
        });
    }
      export function deleteBlog(req, res) {
        const blogId = req.params.blog;
      
        Blog.findByIdAndDelete(blogId)
          .then(deletedBlog => {
            if (!deletedBlog) {
              return res.status(404).json({ message: 'Blog not found' });
            }
            res.status(200).json({ message: 'Blog deleted successfully' });
          })
          .catch(error => {
            res.status(400).json({ error: error.message });
          });
      }

    