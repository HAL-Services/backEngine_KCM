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

// to get all the legit reviews
module.exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: true });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
