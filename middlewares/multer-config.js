<<<<<<< Updated upstream
// middlewares/multer-config.js
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // le dossier où les images seront stockées
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
=======
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const destinationPath = join(__dirname, 'images');

// Créez le dossier s'il n'existe pas
if (!fs.existsSync(destinationPath)) {
  fs.mkdirSync(destinationPath);
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, destinationPath);
>>>>>>> Stashed changes
  },
});

const fileFilter = (req, file, callback) => {
<<<<<<< Updated upstream
  if (file.mimetype.startsWith('image/')) {
=======
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
>>>>>>> Stashed changes
    callback(null, true);
  } else {
    callback(new Error('Invalid file type. Only images are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

<<<<<<< Updated upstream
export default upload.single('image'); // Utilisez upload.single pour la gestion d'un seul fichier
=======
export { upload };
>>>>>>> Stashed changes
