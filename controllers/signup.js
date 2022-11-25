const User=require('../model/user');
const bcrypt=require('bcrypt');
const saltRounds = 10;
exports.postData=(req,res,next)=>{
   const name=req.body.name;
   const email=req.body.email;
   const phonenumber=req.body.tel;
   const password = bcrypt.hashSync(req.body.pass, saltRounds);
   User.create({
    name:name,
    email:email,
    phonenumber:phonenumber,
    password:password
   })
.then(()=>{
    res.status(201).json({success:true,
    message:'signup successful'})
}).catch(err=>{
    console.log('err');
    res.status(403).json({success:false,
    message:'email or phone number already exits '})
})
}