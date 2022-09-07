// importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const env = require("dotenv");
// importing routes
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoute");
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

env.config();
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
try {
  mongoose.connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(`Error:${error.message}`);
  process.exit();
}
// using routes
app.use(authRoutes);
app.use(reviewRoutes);
app.use(serviceRoutes);
app.use(userRoutes);

//
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
