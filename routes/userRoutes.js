const express=require('express')
const router=express.Router()
const userDataController = require('../controllers/userDataController')


router.get('/all/', userDataController.all_users);
router.post('/phone/', userDataController.userPhone);

module.exports=router