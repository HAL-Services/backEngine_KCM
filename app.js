const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes/routes.js");
const car_route=require('./routes/car_route')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  "mongodb+srv://halservices:harshluvjeet10@cluster0.o0zhh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use("/", route);
app.use('/car',car_route)
app.listen(5000, (req, res) => {
  console.log("Server is up and running at Port 5000");
});
