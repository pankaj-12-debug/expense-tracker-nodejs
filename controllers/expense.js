//const { response } = require('express');
const Expense=require('../model/expense');
const AWS=require('aws-sdk');
 
function uploadToS3(data,filename)
{
    const BUCKET_NAME='expensetrackingapp';
    const IAM_USER_KEY='AKIA24E2ZAQGBUWCTZHV';
    const IAM_USER_SECRET='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';

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
      //  Bucket:BUCKET_NAME
    })
    
        var params={
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read'
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if(err){
                    console.log('something went wrong',err)
                    reject(err);
                }
                else{
                 //   console.log('sucess',s3response);
                    resolve(s3response.Location);
                }
            })
        })
}

exports.download=async(req,res)=>{
    const expenses=await req.user.getExpenses();
    console.log(expenses);
    const stringifiedExpenses=JSON.stringify(expenses);
    const userId=req.user.id;
    const filename=`Expense${userId}/${new Date}.txt`;
    const fileUrl=await uploadToS3(stringifiedExpenses,filename);
    console.log(fileUrl);
    res.status(200).json({fileUrl,success:true});
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
        //return res.send(expenses);
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