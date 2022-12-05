const express=require('express');
const router=express.Router();
const passwordController=require('../controllers/password');
router.get('/updatepassword/:resetpasswordid',passwordController.updatepassword);
router.get('/resetpassword/:id',passwordController.resetpassword);
router.post('/forgotpassword',passwordController.forgotpassword);
module.exports=router;