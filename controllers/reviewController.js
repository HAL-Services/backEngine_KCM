const Review = require("../models/review_schema");

// generating new review
module.exports.createReview = async (req, res) => {
  try {
    const { username, data, stars } = req.body;
    const review = await Review.create({ username, data, stars });
    res.status(201).send({ review });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// update reivew status
module.exports.updateReview = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("Access Denied");
    return;
  }
  try {
    const { id, status } = req.body;
    const review = await Review.findOneAndUpdate(
      { _id: id },
      {
        status,
      },
      { new: true }
    );
    if (review) res.status(200).send(review);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// to delete reviews
module.exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteReview = await Review.findByIdAndDelete(id);
    if (!deleteReview) return res.status(400).send();
    return res.status(200).send(deleteReview);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// to get all the legit reviews
module.exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: true });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// to get pending reviews
module.exports.getPendingReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "false" });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// to get all reviews
module.exports.getAllReviews = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("Access Denined");
    return;
  }
  try {
    const allReviews = await Review.find();
    res.status(200).send(allReviews);
  } catch (error) {
    res.status(404).send({ error: error.message, message: "No reviews found" });
  }
};
