const User = require('../models/user_schema')

module.exports.all_users = async (req, res)=>{
    const temp = await User.find({});
    const data = []
    temp.map((user)=>{
        data.push(user._doc);
    })
    if (data.length>0){
        res.status(200).send({data:data})
    }
    else{
        res.status(500).send({msg:"Invalid querry", data:[]})
    }

}

