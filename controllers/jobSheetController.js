const jobSheet = require("../models/jobSheet_schema");
module.exports.job_data=async(req,res)=>{
    const username=req.body.username
    const temp=await jobSheet.findOne({})
}