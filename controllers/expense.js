//const { response } = require('express');
const Expense=require('../model/expense');
const UserService=require('../services/userservices');
const S3Service=require('../services/S3service');
const Report=require('../model/report');
 
exports.download=async(req,res)=>{
    try{
    const expenses=await UserService.getExpenses(req);
    console.log(expenses);
    const stringifiedExpenses=JSON.stringify(expenses);
    const userId=req.user.id;
    const filename=`Expense${userId}/${new Date}.txt`;
    const fileUrl=await S3Service.uploadToS3(stringifiedExpenses,filename);
    console.log(fileUrl);
    await req.user.createReport({fileUrl: fileUrl});
    res.status(200).json({fileUrl,success:true});
}
catch(err){
    console.log(err);
res.status(500).json({fileUrl:'',success:false,err:err});
}
}
exports.getReports= async(req,res)=>{
    try{
        const reports= await req.user.getReports();
        res.status(200).json(reports);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}


//exports.postExpense=(req,res,next)=>{
   
   // const amount=req.body.amount;
    //const description=req.body.description;
    //const category=req.body.category;
    //if(amount==undefined || amount.length===0 || description==null ||
      //  description.length===0 ||category==null || category===0){
        //    return res.status(400).json({message:"bad parameters sometines is missing"});
       // }
    //Expense.create({
      //  amount:amount,
       // description:description,
       // category:category,
        //userId:req.user.id
    //}).then(()=>{
      //  res.status(201).json({success:true,
        //    message:'expense is working'})
    //}).catch(err=>{
      //  console.log('err');
        //res.status(500).json({success:false,
          //  message:'expense is not working '})
    //})
//}
exports.postExpense = async (req, res) => {
    try {
        const { amount, description, category } = req.body;
        const expense = await req.user.createExpense({ amount, description, category});
        res.status(201).json({ success: true, message: 'succesfully added', expense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
};














//exports.getExpense=(req,res,next)=>{
  //  const page = +req.query.page || 1;
   // const ITEMS_PER_PAGE = +req.query.limit || 5;
   // const numExpenses = Expense.findAll({ where: { userId:req.user.id } });
    //let totalItems;
    //Expense.findAll({where:{userId:req.user.id},
      //  offset: ((page - 1) * ITEMS_PER_PAGE),
       // limit: ITEMS_PER_PAGE
    //}).then(expenses=>{
      
      // return res.status(200).json({expenses,success:true,
        //'pagination': {
          //     currentPage: page,
            //   hasNextPage: ITEMS_PER_PAGE * page < totalItems,
              // hasPreviousPage: page > 1,
              // nextPage: page + 1,
              // previousPage: page - 1,
              // lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
           //}
    //});
    //})
    //.catch(err=>{
      //  return res.status(500).json({error:err,success:false});
    //})
//}


exports.getExpense = async (req, res) => {
    try {
      //  const userId = req.query.userId;
    
        const page = +req.query.page || 1;
        const ITEMS_PER_PAGE = +req.query.limit || 5;

        const numExpenses = await Expense.findAll({ where: { userId:req.user.id } });
        const totalItems = numExpenses.length;
        const expense = await Expense.findAll({
            where: { userId:req.user.id},
            offset: ((page - 1) * ITEMS_PER_PAGE),
            limit: ITEMS_PER_PAGE
});

        res.status(200).json({
            'expense': expense,
            'pagination': {
                currentPage: page,
                hasNextPage: ITEMS_PER_PAGE * page < totalItems,
                hasPreviousPage: page > 1,
                nextPage: page + 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({error:err,success:false});
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.expenseId;
        await Expense.destroy({ where: { id: expenseId } });
        res.status(200).json({ success: true, message: 'deleted successfully' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}








//exports.deleteExpense=(req,res,next)=>{
  //  const expenseid=req.params.expenseid;
    //if(expenseid==undefined ||expenseid===0)
   // {
     //   return res.status(400).json({success:false,message:'something is wrong'});
    //}
    //Expense.destroy({where:{id:expenseid}}).then(()=>{
      //  return res.status(204).json({success:true,message:'delete successful'});
    //}).catch(err=>{
      //  console.log('err');
        //return res.status(500).json({success:true,message:'delete failed'});
    //})
//}

