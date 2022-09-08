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
    const { id, type } = req.body;
    const review = await Review.findOneAndUpdate(
      { _id: id },
      {
        type,
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
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const { id } = req.body;
    const deleteReview = await Review.findByIdAndDelete(id);
    if (!deleteReview) return res.status(400).send();
    else return res.status(200).send(deleteReview);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// to get all the good reviews
module.exports.getOnSiteReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ type: "onsite" });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// to get pending reviews
module.exports.getPendingReviews = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const reviews = await Review.find({ type: "off" });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// to get good reviews
module.exports.getReviews = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const reviews = await Review.find({ type: "selected" });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
