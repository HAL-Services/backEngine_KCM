const express=require('express')
const router=express.Router()

const authController = require('../controllers/authController')
const otpController = require('../controllers/otpController')

router.get('/',(req,res)=>{
    res.send("hello world")
});

router.post("/signup", authController.signUp_post);
router.post('/send-otp', otpController.send_otp);
router.post('/verify-otp', otpController.verify_otp);


module.exports=router
