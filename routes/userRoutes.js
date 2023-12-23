import express from 'express';

const router = express.Router();





<<<<<<< Updated upstream
import { FarmerSignUp , login ,ProfilePicUpload ,ClientSignUp, getAllUsers, ProfileEdit, forgetPasssword, verifyOtp, resetPassword,sendOTP } from '../controllers/userController.js';
=======
import { FarmerSignUp , login ,ProfilePicUpload ,ClientSignUp,AdminSupSignUp, getAllUsers, ProfileEdit, forgetPasssword, verifyOtp, resetPassword,sendOTP, deleteUserByNumTel } from '../controllers/userController.js';
>>>>>>> Stashed changes
 import { auth, authAdminSup ,authClient ,authFarmer } from '../middlewares/auth.js'; 



router
  .route('/FarmerSignup')
  .post(FarmerSignUp);

  router
  .route('/sendOTP')
  .post(sendOTP)

router
  .route('/forgetPassword')
  .post(forgetPasssword)

  router
  .route('/resetPassword')
  .post(resetPassword)
router
  .route('/verifyOTP')
  .post(verifyOtp)

<<<<<<< Updated upstream
=======
  router
  .route('/AdminSignup')
  .post(AdminSupSignUp);
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
  router
  .route('/AllUser')
  .get(getAllUsers)

>>>>>>> Stashed changes
router
  .route('/editProfile')
  .patch(auth,ProfileEdit)

<<<<<<< Updated upstream
=======
  router
  .route('/:numTel')
  .delete(deleteUserByNumTel);


>>>>>>> Stashed changes


 export default  router;