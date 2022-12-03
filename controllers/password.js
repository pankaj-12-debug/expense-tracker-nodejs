const uuid=require('uuid');
const sgMail=require('@sendgrid/mail');
const bcrypt=require('bcrypt');
const User=require('../model/user');
const Forgotpassword=require('../model/password');
 exports.forgotpassword = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        if(user){
            const id = uuid.v4();
            user.createForgotpassword({ id , active: true })
                .catch(err => {
                    throw new Error(err)
                })

            sgMail.setApiKey(process.env.SENGRID_API_KEY);

            const msg = {
                to: 'iaspankaj246@gmail.com', // Change to your recipient
                from: 'kajopkkumar12@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:8000/resetpassword/${id}">Reset password</a>`,
            }

            sgMail
            .send(msg)
            .then((response) => {

                // console.log(response[0].statusCode)
                // console.log(response[0].headers)
                console.log('email sent');
                return res.status(response[0].statusCode).json({message: 'Link to reset password sent to your mail ', sucess: true})

            })
            .catch((error) => {
               // throw new Error(error)
               console.log('error');
            })

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
       // console.error(err)
       console.log('err');
        return res.json({ message: err, sucess: false });
    }

}