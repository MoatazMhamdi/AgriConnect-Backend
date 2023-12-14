
import User from '../models/user.js' ;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import upload from '../middlewares/multerConfig.js'
import otpGenerator from 'otp-generator';
import Otp from '../models/otp.js';
import { sendEmail } from '../utils/mailSender.js';
import { sendSMS } from '../utils/smsSender.js';




export async function FarmerSignUp(req, res, next) {
      try{
      const hash = await bcrypt.hash(req.body.password, 10);
      const existingUser = await User.findOne({ numTel: req.body.numTel ,
      });
       if (existingUser) {
           return res.status(400).json({ message: "It seems you already have an account, please log in instead." }); }

  
     
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        numTel: req.body.numTel,

        role: 'Farmer',
      });
  
      await user.save();

      return res.status(200).json({ message: 'Farmer created' });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export  async function ProfilePicUpload (req,res,next){
    upload.single('picture')(req, res,async (err) => {
      if (err) {   
        return res.status(500).json({ error: err.message }); 
      } 
      
      try {         
      const authenticatedEmail = req.auth.email; 
      if (authenticatedEmail !== req.body.email) {
        return res.status(403).json({ error: 'Permission denied. You can only change your own picture.' });
      }

     const user = await User.findOneAndUpdate(
         { email: req.body.email },
         { picture: req.file.path },
         { new: true } 
         );             
         if (!user) {
          return res.status(404).json({ error: 'User not found' });
          }
                        
         return res.status(200).json({ message: 'Profile picture updated', user });
         } catch (error) {
            return res.status(500).json({ error: 'Failed to update profile picture' });  
        }
    })     
    
  };

export async function ClientSignUp(req,res,next){
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const existingUser = await User.findOne(
    { numTel: req.body.numTel },
    );

    if (existingUser) {
      return res.status(400).json({ message: "It seems you already have an account, please log in instead." });
    }

  
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        numTel: req.body.numTel,
 

        role: 'Client',
      });
      sendEmail(req.body.email,'Welcome to HealthLink',pwd)

  
      await user.save();

      return res.status(200).json({ message: 'Client created' });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};
export async function AdminSupSignUp(req,res,next){
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const existingUser = await User.findOne(
    { numTel: req.body.numTel },
    );

    if (existingUser) {
      return res.status(400).json({ message: "It seems you already have an account, please log in instead." });
    }

  
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        numTel: req.body.numTel,
 

        role: 'AdminSup',
      });
      //sendEmail(req.body.email,'Welcome to HealthLink',pwd)

  
      await user.save();

      return res.status(200).json({ message: 'Admin created' });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

export function login(req, res, next) {
  User.findOne({ numTel: req.body.numTel })
      .then(user => {
          if (!user) {
              return res.status(401).json({ message: 'User is not registered' });
          }

          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ message: 'Password incorrect' });
                  } else {
                      const maxAge = 1 * 60 * 60;
                      const token = jwt.sign(
                          { userId: user._id, role: user.role, numTel: user.numTel },
                          "" + process.env.JWT_SECRET,
                          { expiresIn: maxAge } // 1hr in sec
                      );
                      res.cookie("jwt", token, {
                          httpOnly: true,
                          maxAge: maxAge * 1000, // 1hr in ms
                          Secure: true,
                      });

                      res.status(200).json({
                          userId: user._id,
                          message: "User successfully Logged in", user
                      });
                  }
              })
              .catch(error => {
                  console.error('Error in bcrypt.compare:', error);
                  res.status(500).json({ error: 'Internal Server Error' });
              });
      })
      .catch(error => {
          console.error('Error in User.findOne:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      });
}

export async function sendOTP(req,res,next){
  try {
    const existingUser = await User.findOne(
      { numTel: req.body.numTel },
    );

    if (existingUser) {
      return res.status(400).json({ message: "It seems you already have an account, please log in instead." });
    }
    const otp = otpGenerator.generate(6,{
      secret: process.env.JWT_SECRET,
      digits: 6,
      algorithm: 'sha256',
      epoch: Date.now(),
      upperCaseAlphabets: false, specialChars: false,
      lowerCaseAlphabets: false,
  });
        const otpDocument = new Otp({
            userId: req.body.numTel, 
            otp
        });

         otpDocument.save();
       /*  const Tnumtel ="+216" + req.body.numTel
        sendSMS(Tnumtel,otp)*/
        res.status(200).json({ message: "OTP Sent"});

} catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
}


export async function forgetPasssword(req,res,next){
  try{
    User.findOne({ numTel: req.body.numTel })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'User is not registered' });
        }
        const otp = otpGenerator.generate(6,{
          secret: process.env.JWT_SECRET,
          digits: 6,
          algorithm: 'sha256',
          epoch: Date.now(),
          upperCaseAlphabets: false, specialChars: false,
          lowerCaseAlphabets: false,
      });
      const otpDocument = new Otp({
        userId: req.body.numTel, 
        otp,
      });
       otpDocument.save();
      return res.status(200).json({otp})
        
      })
  }
      catch(error) {
        console.error('Error in User.findOne:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}

export async function verifyOtp(req, res, next) {
  try {
    const { numTel, otp } = req.body;
    const otpDocument = await Otp.findOne({ userId: numTel });

    if (!otpDocument) {
      return res.status(404).json({ error: 'OTP not found' });
    }

    // Verify the OTP
    if (otp === otpDocument.otp) {
      // Delete the OTP document
      await otpDocument.deleteOne();

      return res.status(200).json({ message: 'OTP verified' });
    } else {
      return res.status(401).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function resetPassword(req,res,next){
  try {
 
    const hash = await bcrypt.hash(req.body.newPassword, 10);
  
    const user = await User.findOneAndUpdate(
      { numTel: req.body.numTel },
      { password: hash },
      { new: true } 
      );             
      if (!user) {
       return res.status(404).json({ error: 'User not found' });
       }
                     
      return res.status(200).json({ message: 'Password changed !', user });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function ProfileEdit(req, res, next) {
  try {
    const authenticatedId = req.auth.userId;
    const userId = req.body.userId; 

    if (authenticatedId !== userId) {
      return res.status(403).json({ error: 'Permission denied. You can only edit your own profile.' });
    }
    User.findByIdAndUpdate(userId, req.body, { new: true, useFindAndModify: false })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: `Cannot update user with ID ${userId}. User not found.` });
        }

        return res.status(200).json({ message: 'Profile updated', user });
      })
      .catch((error) => {
        return res.status(500).json({ error: 'Failed to update profile' });
      });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update profile' });
  }
}
export async function deleteUserByNumTel(req, res, next) {
  try {
    const numTel = req.params.numTel; // Extract numTel from route parameter

    console.log('Attempting to delete user with numTel:', numTel);

    // Find the user by numTel
    const userToDelete = await User.findOne({ numTel });

    if (!userToDelete) {
      console.log('User not found for numTel:', numTel);
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await userToDelete.deleteOne();

    console.log('User deleted successfully:', userToDelete);
    res.json({ message: 'User deleted successfully', user: userToDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export async function getAllUsers(req,res,next){
  try {
    const Users = await User.find().exec();
    res.status(200).json(Users);
} catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.error(error);
}
}

function generatePassword() { 
    var length = 8, 
        charset =  
"@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz", 
        password = ""; 
    for (var i = 0, n = charset.length; i < length; ++i) { 
        password += charset.charAt(Math.floor(Math.random() * n)); 
    } 
    return password; 
} 
/*const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export function forgotPasswordSMS(req, res) {
  const { numTel } = req.body;

  // Generate an OTP (e.g., a 6-digit code)
  const otpCode = otpGenerator.generate(6, { upperCase: false, specialChars: false });

  // Set the expiration time for the OTP (e.g., 10 minutes)
  const otpExpiration = Date.now() + 600000;

  // Update the user's otpCode and otpExpiration in the database
  User.findOneAndUpdate(
      { numTel },
      { otpCode, otpExpiration },
      { new: true }
  )
  .then(user => {
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      // Log the updated user data
      console.log('Updated User Data:', user);

      // Ensure the phone number is in the E.164 format
      const phoneNumberE164 = `+21625049802`;  // Replace with the user's phone number field
      console.log('Sending SMS to:', phoneNumberE164);

      // Use Twilio to send the OTP via SMS
      client.messages.create({
          body: `Your OTP for password reset is: ${otpCode}`,
          from: twilioPhoneNumber,
          to: phoneNumberE164,
      })
      .then(() => {
          res.status(200).json({ message: 'Reset OTP sent to your phone.' });
      })
      .catch(error => {
          console.error('Error sending SMS:', error);
          res.status(500).json({ error: 'Error sending OTP via SMS.' });
      });
  })
  .catch(error => {
      res.status(500).json({ error: error.message });
  });
}*/
