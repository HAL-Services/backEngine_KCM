require('dotenv').config()

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;

module.exports.send_otp = (req,res)=>{
    res.status(200).json({accountSid:accountSid, authToken: authToken, smsKey:smsKey})
}