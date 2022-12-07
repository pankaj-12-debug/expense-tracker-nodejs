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


exports.postExpense=(req,res,next)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    if(amount==undefined || amount.length===0 || description==null ||
        description.length===0 ||category==null || category===0){
            return res.status(400).json({message:"bad parameters sometines is missing"});
        }
    Expense.create({
        amount:amount,
        description:description,
        category:category,
        userId:req.user.id
    }).then(()=>{
        res.status(201).json({success:true,
            message:'expense is working'})
    }).catch(err=>{
        console.log('err');
        res.status(500).json({success:false,
            message:'expense is not working '})
    })
}
exports.getExpense=(req,res,next)=>{
    Expense.findAll({where:{userId:req.user.id}}).then(expenses=>{
      //  return res.send(expenses);
       return res.status(200).json({expenses,success:true});
    })
    .catch(err=>{
        return res.status(500).json({error:err,success:false});
    })
}

exports.deleteExpense=(req,res,next)=>{
    const expenseid=req.params.expenseid;
   // console.log(id);
    if(expenseid==undefined ||expenseid===0)
    {
        return res.status(400).json({success:false,message:'something is wrong'});
    }
    Expense.destroy({where:{id:expenseid}}).then(()=>{
        return res.status(204).json({success:true,message:'delete successful'});
    }).catch(err=>{
        console.log('err');
        return res.status(500).json({success:true,message:'delete failed'});
    })
}