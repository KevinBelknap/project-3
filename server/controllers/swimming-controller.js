const { swimming, User } = require("../models");

module.exports = {
  // create Swimming
  createSwimming({ body }, res) {
    swimming.create(body)
      .then((dbSwimmingData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { swimming: dbSwimmingData._id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Swimming created but no user with this id!" });
        }
        res.json({ message: "Swimming created successfully!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // get one Swimming by id
  getSwimmingById({ params }, res) {
    swimming.findOne({ _id: params.id })
      .then((dbSwimmingData) => {
        if (!dbSwimmingData) {
          return res.status(404).json({ message: "No Swimming data found with this id!" });
        }
        res.json(dbSwimmingData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete Swimming data
  deleteSwimming({ params }, res) {
    swimming.findOneAndDelete({ _id: params.id })
      .then((dbSwimmingData) => {
        if (!dbSwimmingData) {
          res.status(404).json({ message: "No Swimming data found with this id!" })
        }
        // remove Swimming on user data
        return User.findOneAndUpdate(
          { swimming: params.id },
          { $pull: { swimming: params.id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Swimming deleted but no user with this id!" });
        }
        res.json({ message: "Swimming successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};