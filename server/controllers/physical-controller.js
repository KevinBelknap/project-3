const { physical, User } = require("../models");

module.exports = {
  // create physical
  createPhysical({ body }, res) {
    physical.create(body)
      .then((dbPhysicalData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { physical: dbPhysicalData._id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "physical created but no user with this id!" });
        }
        res.json({ message: "physical successfully created!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // get one physical by id
  getPhysicalById({ params }, res) {
    physical.findOne({ _id: params.id })
      .then((dbPhysicalData) => {
        if (!dbPhysicalData) {
          return res.status(404).json({ message: "No physical data found with this id!" });
        }
        res.json(dbPhysicalData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete physical data
  deletePhysical({ params }, res) {
    physical.findOneAndDelete({ _id: params.id })
      .then((dbPhysicalData) => {
        if (!dbPhysicalData) {
          res.status(404).json({ message: "No physical data found with this id!" });
          return;
        }
        // remove physical on user data
        return User.findOneAndUpdate(
          { physical: params.id },
          { $pull: { physical: params.id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "physical deleted but no user with this id!" });
        }
        res.json({ message: "physical successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};