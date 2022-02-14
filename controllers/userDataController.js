const User = require('../models/user_schema')

module.exports.all_users = async (req, res)=>{
    const temp = await User.find({});
    const data = []
    temp.map((user)=>{
        data.push(user._doc);
    })
    if (data.length>0){
        res.status(200).send({data:data, data_found:true})
    }
    else{
        res.status(500).send({msg:"Invalid query", data:[], data_found:false})
    }

}

module.exports.userPhone = async (req, res) =>{
    const phone = req.body.phone;
    const query = await User.findOne({phone_number:phone});
    if (query === null){
        res.status(500).send({msg:"Record not found", data_found:false })
    }
    else {
        res.status(200).send({data: query._doc, data_found:true});
    }
}
