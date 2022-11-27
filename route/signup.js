const express=require('express');
const router=express.Router();
const controllers=require('../controllers/signup');
router.post('/sign-up',controllers.postData);
router.post('/login',controllers.loginData);
module.exports=router;