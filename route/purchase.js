const express=require('express');
const router=express.Router();
const constroller=require('../controllers/purchase');
const middleware=require('../middleware/auth');
router.get('/purchase',middleware.authenticate,constroller.purchase);
router.post('/transactionstatus',middleware.authenticate,constroller.TransactionStatus);
module.exports=router;