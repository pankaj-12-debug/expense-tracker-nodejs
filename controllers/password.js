const uuid=require('uuid');
const sgMail=require('@sendgrid/mail');
const bcrypt=require('bcrypt');
const User=require('../model/user');
const Forgotpassword=require('../model/password');
const path=require('path');
const Sib=require('sib-api-v3-sdk')
const dotenv=require('dotenv');
dotenv.config();
//const client = Sib.ApiClient.instance
//const apiKey = client.authentications['api-key']
//apiKey.apiKey = process.env.API_KEY
 exports.forgotpassword = async (req, res) => {
    try {
        //let requestId;
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
          // requestId=uuid.v4();
          // console.log('id' + id);
           console.log('34');
            user.createForgotpassword({ id, active: true })
            //Forgotpassword.create({ id:requestId,isActive:true})
                .catch(err => {
                    throw new Error(err)
             })

          //  sgMail.setApiKey(process.env.SENGRID_API_KEY);

            //const msg = {
              //  to: email, // Change to your recipient
                //from: 'iaspankaj246@gmail.com', // Change to your verified sender
               // subject: 'Sending with SendGrid is Fun',
               // text: 'and easy to do anywhere, even with Node.js',
               // html: `<a href="http://localhost:8000/resetpassword/${id}">Reset password</a>`,
            //}
            const client = Sib.ApiClient.instance
            const apiKey = client.authentications['api-key']
            apiKey.apiKey = process.env.API_KEY
            const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email: 'iaspankaj246@gmail.com',
    name: 'Pankaj',
}
const receivers = [
    {
        email: 'iaspankaj246@gmail.com',
    },
]
tranEmailApi
    .sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Subscribe to Cules Coding to become a developer',
        textContent: `
        Cules Coding will teach you how to become {{params.role}} a developer.
        `,
        htmlContent: `
        <h1>Cules Coding</h1>
        <a href="http://localhost:8000/resetpassword/${id}">Reset password</a>
                `,
        params: {
            role: 'Frontend',
        },
    })
            //sgMail.send(msg)
            .then((response) => {

                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
              console.log('email sent');
           //   return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})
                  res.status(202).json({message:'done'});
          })
            .catch((error) => {
                throw new Error(error)
              console.log('error');
            })

         //   send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
       console.log('err');
        return res.json({ message: err, sucess: false });
    }

}

exports.resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ where : { id }})
   // .then(data=>{
     //   if(data){
       //     if(data.isActive==true){
         //       res.sendFile(path.join(__dirname, '../resetpassword/reset.html'));
           // }else
            //return res.status(400).json({success:false,message:"IsActive False, please create the req again"})
      //  }
    //})
    .then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            forgotpasswordrequest.update({ active: false});
            res.status(200).send(`<html>
                                    <script>
                                       function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>Reset Password</button>
                                    </form>
                                </html>`
                                )
           res.end()

        }
    })
}

exports.updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                 console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                       if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
           } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}
