const express=require('express');
const router=express.Router();
const constroller=require('../controllers/expense');
const userAuthenticate=require('../middleware/auth');
router.post('/addexepens',userAuthenticate.authenticate,constroller.postExpense);
router.get('/getexepens',userAuthenticate.authenticate,constroller.getExpense);
router.delete('/deleteExpens/:expenseid',userAuthenticate.authenticate,constroller.deleteExpense);
module.exports=router;