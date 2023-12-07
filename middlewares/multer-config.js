// middlewares/multer-config.js
import multer from 'multer';


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // le dossier où les images seront stockées
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type. Only images are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload.single('image'); // Utilisez upload.single pour la gestion d'un seul fichier