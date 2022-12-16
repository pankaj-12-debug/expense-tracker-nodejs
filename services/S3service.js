const AWS=require('aws-sdk');
const dotenv=require('dotenv');
dotenv.config();
const uploadToS3=(data,filename)=>
{
    const  BUCKET_NAME='expensetrackingapp';
     const IAM_USER_KEY='AKIA24E2ZAQGBUWCTZHV';
    const IAM_USER_SECRET='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';

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        Bucket:BUCKET_NAME
      //accessKeyId:process.env.IAM_USER_KEY,
      //secretAccessKey:process.env.IAM_USER_SECRET
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
module.exports={
    uploadToS3
}