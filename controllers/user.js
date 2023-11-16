
import User from '../models/user.js' ;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import upload from '../middlewares/multerConfig.js'




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
  
      await user.save();

      return res.status(200).json({ message: 'Client created' });
    
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
                          message: "User successfully Logged in",
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
  