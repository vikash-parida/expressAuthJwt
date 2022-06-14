const models = require('../models');
const jwt = require('jsonwebtoken');


exports.checkUserAuth = async (req, res, next)=> {
    let token 
    const {authrization} = req.headers
    if(authrization && authrization.startsWith('Bearer')){
    try {
    token = authrization.split(' ')[1]
    console.log(token);
    // verify user token 
    const {userId}  = jwt.verify(token,process.env.JWT_SECRET_KEY)

       req.user = await models.users.findById(userId).select('-password');
       console.log(req.user);
       next();

   } catch (error) {
    res.status(404).send({status:'failed', message:'unauthrized user'});
  }
   }if(!token){
    res.status(404).send({status:'failed', message:"unauthrized use no token"});
  }
   }