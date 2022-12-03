const express=require('express');
const router=express.Router();
const passwordController=require('../controllers/password');
router.post('/forgotpassword',passwordController.forgotpassword);
module.exports=router;