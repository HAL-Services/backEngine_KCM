const { reset } = require("nodemon");
const Cars = require("../models/cars_schema");
const User = require("../models/user_schema");
const router = require("express").Router();

module.exports.get_cars = async (req, res) => {
  try {
    const cars = await Cars.find();
    res.status(200).send({ data: cars, data_found: true });
  } catch (err) {
    res
      .status(404)
      .send({ data: { msg: "User not found" }, data_found: false });
  }
};

module.exports.getCar_ByNumber = async (req, res) => {
  const { phone_number } = req.body;
  try {
    let temp = [];
    const user = await User.findOne({ phone_number });
    if (!user) {
      res
        .status(404)
        .send({ data: { msg: "User not found" }, data_found: false });
    } else {
      const cars = await Cars.find();
      cars.map((car) => {
        if (car.owner.equals(user.id)) {
          temp.push(car._doc);
        }
      });
      if (temp.length === 0) {
        res
          .status(404)
          .send({ data: { msg: "User not found" }, data_found: false });
      } else res.status(200).send({ data: temp, data_found: true });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// CREATING A USER
module.exports.post_cars = async (req, res) => {
  const { model, car_number, phone_number } = req.body;
  try {
    const user = await User.findOne({ phone_number });

    if (user) {
      const car = await Cars.create({
        model,
        car_number,
      });
      car.owner = user;
      car.save();
      res.status(200).send({ data: car._doc, data_found: true });
    } else {
      res
        .status(404)
        .send({ data: { msg: "User not found" }, data_found: false });
    }
  } catch (erro) {
    res.status(400).send({ error: erro.message });
  }
};
