const express=require('express')
const router=express.Router()
const userDataController = require('../controllers/userDataController')


router.get('/all/', userDataController.all_users);
router.get('/phone/', userDataController.userPhone);

module.exports=router