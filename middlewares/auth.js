import jwt from 'jsonwebtoken' ;


 
export function auth (req, res, next)  {
    
   try {
    const token = req.headers.authorization.split(' ')[1];    
       const decodedToken = jwt.verify(token, ""+process.env.JWT_SECRET);
       const userId = decodedToken.userId;
       const role = decodedToken.role;
       const email = decodedToken.email;
       const numTel = decodedToken.numTel;
       req.auth = {
           userId: userId,
           role : role,
           email: email, 
           numTel: numTel,   
       };
	next();
   } catch(error) {
       res.status(401).json({message : 'user is not authenticated'});
   }
}
export function authFarmer(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const name = decodedToken.name
        const email = decodedToken.email;
        const numTel = decodedToken.numTel;
        req.auth = {
            userId: userId,
            name: name,
            role : role,
            email: email, 
            numTel: numTel,   
        };
    if (req.auth.role === 'Farmer') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. You are not a farmer.' });
    }
  }catch(error){
    res.status(401).json({message : 'user is not authenticated'});

  }
} 
  
  export function authClient(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const name = decodedToken.name
        const role = decodedToken.role;
        const email = decodedToken.email;
        const numTel = decodedToken.numTel;
        req.auth = {
            userId: userId,
            role : role,
            email: email, 
            numTel: numTel,   
        };
    if (req.auth.role === 'Client') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. You are not a Client.' });
    }
  }catch(error){
    res.status(401).json({message : 'user is not authenticated'});

  }
}
  
 

  
 
  export function authAdminSup(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        const email = decodedToken.email;
        const numTel = decodedToken.numTel;
        req.auth = {
            userId: userId,
            role : role,
            email: email, 
            numTel: numTel,   
        };
    if (req.auth.role === 'AdminSup') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access denied. You are not an admin supervisor.' });
    }
  }catch(error){
    res.status(401).json({message : 'user is not authenticated'});

  }
}

export default auth;