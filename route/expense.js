const express=require('express');
const router=express.Router();
const constroller=require('../controllers/expense');
router.post('/addexepens',constroller.postExpense);
router.get('/getexepens',constroller.getExpense);
router.delete('/deleteExpens/:expenseid',constroller.deleteExpense);
module.exports=router;