const jwt=require('jsonwebtoken');
const User=require('../model/user');
exports.authenticate=async(req,res,next)=>{
try {
    const token=req.header('Authorization');
    console.log(token);
    const user=jwt.verify(token,'secretkey');
    console.log('userID >>>>',user.userId);
    User.findByPk(user.userId).then(user=>{
       // console.log(JSON.stringify(user));
        req.user=user;
        next();
    })
} catch (error) {
    console.log(error);
    return res.status(401).json({success:false});
}
}