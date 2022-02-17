const User = require("../models/user_schema");
const Cars = require("../models/cars_schema");
const router = require("express").Router();

module.exports.signUp_post = async (req, res) => {
  const { username, phone_number, email } = req.body;
  try {
    const user = await User.create({
      username: username,
      phone_number: phone_number,
      email: email,
    });
    res.status(200).json({ id: user._id });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};


module.exports.Stats = async (req,res) =>{
  try{
    const users = await User.countDocuments();
    const cars = await Cars.countDocuments();
    res.status(200).send({data:{user:users, car: cars}, data_found: true})

  }catch (err){
    res.status(400).send({ error: err.message });
  }
}