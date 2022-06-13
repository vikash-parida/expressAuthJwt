const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.UserRegister = async (req, res) => {
  const {name,email,password,password_confirmation,tc} = req.body;
  const user = await models.users.findOne(
    {
      where:{email:email}
    })
  if(user){
    res.send({"status":"failed", "message":" Email already exists"})
  }else{
    if(name && email && password && password_confirmation && tc){
        if(password === password_confirmation){
      try {
         const salt = await bcrypt.genSalt(10);
         const hashpassword = await bcrypt.hash(password, salt);
         const dos = await models.users.create({
          name:name,
          email:email,
          password:hashpassword,
          tc:tc,
        })
        // find user email 
        const saved_id = await models.users.findOne({ where:{email:email}})
        // create jwt token
        const token = jwt.sign({user_id:saved_id.id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})

         res.status(201).send({"status":"sussecc","message":"Register is susseccfull","token":token})
         } catch (error) {
          res.status(404).send({"status":"failed", "message":"unable to register"})
         }
        }else{
            res.status(404).send({"status":"failed", "message":"  password and  password_confirmation do not match"})
        }

    }else{
        res.status(404).send({"status":"failed", "message":"all fields are required"})
    }
  }
}

exports.UserLogin = async function(req, res){
  try {
    const {email,password} = req.body;
    if(email && password){
      const user = await models.users.findOne({ where:{email:email}}) 
      if(user != null){
       const isMatch = await bcrypt.compare(password, user.password)
       if(user.email === email && isMatch){
       res.status(200).send({"status":"susseccfull", "message":"login successfull"})
       }else{
        res.status(404).send({"status":"failed", "message":"user email or password are not valid"})
       }
      }else{
     res.status(404).send({"ststus":"false", "message":"you are not Register User "})
      }
     }else{
      res.status(404).send({"status":"false","message":"all fields are required"});
    }
  } catch (error) {
    res.send({"status":"error","message":"enable to login"});
  }
}