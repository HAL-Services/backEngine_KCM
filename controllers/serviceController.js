const Service = require("../models/service_schema");

// create new  service
module.exports.createService = async (req, res) => {
  try {
    const {
      email,
      location,
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
      location,
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
// get count of services
module.exports.getCountofServices = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const allServices = await Service.find();
    const pending = allServices.filter((d) => d.booking === "Pending");
    const active = allServices.filter((d) => d.booking === "Active");
    res
      .status(200)
      .json({ pendingCount: pending.length, activeCount: active.length });
  } catch (error) {
    res.status(400).json(error.message);
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

    res.status(200).send(pendingServices);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
// get all active services
module.exports.getActiveServices = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const activeSerivces = await Service.find({ booking: "Active" });
    res.status(200).send(activeSerivces);
  } catch (erro) {
    res.status(400).json(error.message);
  }
};
// get completed services
module.exports.getCompletedServices = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const completedServices = await Service.find({ booking: "Completed" })
      .sort({ _id: 1 })
      .limit(20);
    res.status(200).send(completedServices);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// cancel a service
module.exports.cancleService = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const { id } = req.body;
    const deleteService = await Service.findByIdAndDelete(id);
    res.status(200).send(deleteService);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// search by user
module.exports.getServiceByUser = async (req, res) => {
  try {
    const { email } = req.user;
    const allServices = await Service.find({ email }).sort({ _id: -1 });
    res.status(200).send({ allServices });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// search form admin pannel
module.exports.getServiceForUser = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const { email } = req.body;
    const allServices = await Service.find({ email })
      .sort({ _id: -1 })
      .limit(10);
    res.status(200).json({ allServices });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports.getAllLatestServices = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const allServices = await Service.find().sort({ _id: 1 }).limit(10);
    res.status(200).json({ allServices });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
