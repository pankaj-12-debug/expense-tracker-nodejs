const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds = 10;
function generateAccessToken(id) {
    return jwt.sign({userId:id}, 'secretkey');
}
//post request signup
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
exports.loginData=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.pass;
    User.findAll({where:{email}}).then(user=>{
        if(user.length>0)
        {
            bcrypt.compare(password,user[0].password,function(err,response){
                if(err)
                {
                    return res.json({success:false,message:'login is wrong'})
                }
                if(response)
                {
                    console.log(JSON.stringify(user));
                  //  const jwtToken = generateAccessToken(user[0].id);
                    res.status(200).json({ success: true, message: 'successfully logged in',token:generateAccessToken(user[0].id)});
                }
                else {
                    return res.status(401).json({success: false, message: 'password do not match'});
                }
            })
        }
        else {
            return res.status(404).json({success: false, message: 'user does not exist'});
        }
    })
}