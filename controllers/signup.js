const User=require('../model/user');
const bcrypt=require('bcrypt');
const saltRounds = 10;
exports.postData=(req,res,next)=>{
   const name=req.body.name;
   const email=req.body.email;
   const phonenumber=req.body.tel;
   const password = bcrypt.hashSync(req.body.pass, saltRounds);
   if(name==undefined || name.length===0 || password==null ||
    password.length===0 ||phonenumber==null || phonenumber.length===0
    || email==null ||email.length===0){
        return res.status(400).json({err:"bad parameters sometines is missing"});
    }
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