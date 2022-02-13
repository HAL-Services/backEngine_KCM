require('dotenv').config()
const crypto = require('crypto')

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const smsKey = process.env.SMS_SECRET_KEY;
const sendNumber = process.env.SEND_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken)

module.exports.send_otp = (req,res)=>{
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random()*900000);
    const ttl = 2*60*1000;
    const expires = Date.now()+ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;

    // client.messages.create({
    //     body:`Your One Time Password to login in KCM automobiles is ${otp}`,
    //     from: sendNumber,
    //     to: phone
    // }).then((message)=>console.log(message)).catch((err)=>console.log(err))

    // commented the code so that trial account limit does not exceed

    res.status(200).send({phone, hash:fullHash});

}

module.exports.verify_otp = (req, res)=>{
    const phone = req.body.phone;
    const hash = req.body.hash;
    const otp = req.body.otp;
    let [hashValue, expires] = hash.split('.');
    let now = Date.now();

    if (now > parseInt(expires)) {
        return res.status(504).send({ msg: 'Timeout. Please try again' });
    }
    let data = `${phone}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');

    if (newCalculatedHash === hashValue){
        return res.status(202).send({msg:'user confirmed', verification:true});
    }else{
        return res.status(401).send({msg:'Incorrect OTP', verification:false});
    }
}