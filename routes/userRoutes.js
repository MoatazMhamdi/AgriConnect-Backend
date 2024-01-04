import express from 'express';

const router = express.Router();





import { FarmerSignUp , login ,ProfilePicUpload ,ClientSignUp,AdminSupSignUp,  getAllUsers, ProfileEdit, forgetPasssword, verifyOtp,banUser,unbanUser, resetPassword,sendOTP,updateUserUsername, updateEmail,updatePassword,UpdateNumTel } from '../controllers/userController.js';
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
  router
  .route('/AdminSignup')
  .post(AdminSupSignUp);

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
  .get(getAllUsers)

  router
  .route('/banUser/:id')
  .post(banUser);
  router
  .route('/UnbanUser/:id')
  .post( unbanUser);

router
  .route('/editProfile/:id')
  .patch(ProfileEdit)

  router
  .route('/editName/:id')
  .patch(updateUserUsername)
  router
  .route('/editEmail/:id')
  .patch(updateEmail)
  router
  .route('/editPassword/:id')
  .patch(updatePassword)
  router
  .route('/editNumTel/:id')
  .patch(UpdateNumTel)


 export default  router;