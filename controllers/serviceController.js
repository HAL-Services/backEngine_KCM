const Service = require("../models/service_schema");

// create new  service
module.exports.createService = async (req, res) => {
  try {
    const {
      email,
      address,
      carNumber,
      carModel,
      mobile,
      username,
      time,
      date,
    } = req.body;
    const service = await Service.create({
      email,
      username,
      address,
      carNumber,
      carModel,
      mobile,
      time,
      date,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// update service status
module.exports.updateServiceStatus = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("Access Denied");
    return;
  }
  try {
    const { id, booking } = req.body;
    const service = await Service.findOneAndUpdate(
      { _id: id },
      {
        booking,
      },
      { new: true }
    );
    if (service) res.status(200).send(service);
    else res.status(400).send({ error: "Please try again" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get all pending services
module.exports.getPendingServices = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("Access Denied");
    return;
  }
  try {
    const pendingServices = await Service.find({ booking: "Pending" });

    res.status(200).send({ pendingServices });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports.getPendingServiceByUser = async (req, res) => {
  try {
    const { email } = req.body;
    const allServices = await Service.find({ email });
    res.status(200).send({ allServices });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
