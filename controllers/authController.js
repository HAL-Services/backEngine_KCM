const User = require('../models/user_schema')
const router = require("express").Router()

module.exports.signUp_post = async (req,res)=>{
    const {username, phone_number, email} = req.body;
    try{
        const user = await User.create({username: username, phone_number:phone_number, email:email});
        res.status(200).json({id:user._id})

        // user.save((err)=>{
        //     if (err){
        //         res.sendStatus(400).send({error:err.message});
        //     }
        //     else{
        //         res.sendStatus(200).send(user)
        //     }
        // });
    }
    catch(err){
        res.sendStatus(400).send({error:err.message});
    }
}
