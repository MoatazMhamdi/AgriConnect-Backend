const Category = require('../models/category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id; // Récupérer l'ID de la catégorie depuis les paramètres de la requête
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'La catégorie n\'existe pas' });
      }
  
      res.json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
      res.status(500).send(error);
    }
  };


  exports.updateCategory = async (req, res) => {
    try {
      const categoryId = req.params.id; // Récupérer l'ID de la catégorie depuis les paramètres de la requête
      const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'La catégorie n\'existe pas' });
      }
  
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).send(error);
    }
  };