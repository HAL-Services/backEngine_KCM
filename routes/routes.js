const express=require('express')
const router=express.Router()

const authController = require('../controllers/authController')

router.get('/',(req,res)=>{
    res.send("hello world")
});

router.post("/signup", authController.signUp_post);
router.get('/stats/', authController.Stats)

module.exports=router
