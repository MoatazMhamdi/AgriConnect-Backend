import User from '../models/user.js';
// Contrôleur pour créer un nouvel utilisateur
export const createUser = async (req, res) => {
  try {
    const { name, numTel } = req.body;

    const newUser = new User({
      name,
      numTel,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
