import express from 'express';

const router = express.Router();





import { FarmerSignUp , login ,ProfilePicUpload ,ClientSignUp, getAllUsers, ProfileEdit } from '../controllers/user.js';
 import { auth, authAdminSup ,authClient ,authFarmer } from '../middlewares/auth.js'; 



router
  .route('/FarmerSignup')
  .post(FarmerSignUp);




  router
  .route('/ClientSignup')
  .post(ClientSignUp);

router
  .route('/login')
  .post(login);

router
  .route('/updatePicture')
  .patch(authFarmer,ProfilePicUpload);

router
  .route('/AllUsers')
  .get(authAdminSup,getAllUsers)

router
  .route('/editProfile')
  .patch(auth,ProfileEdit)



 export default  router;