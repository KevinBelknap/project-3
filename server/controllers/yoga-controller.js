const { yoga, User } = require("../models");

module.exports = {
  // create yoga
  createYoga({ body }, res) {
    yoga.create(body)
      .then((dbYogaData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { yoga: dbYogaData._id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "yoga created but no user with this id!" });
        }
        res.json({ message: "yoga created successfully!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // get one yoga by id
  getYogaById({ params }, res) {
    yoga.findOne({ _id: params.id })
      .then((dbYogaData) => {
        if (!dbYogaData) {
          return res.status(404).json({ message: "No yoga data found with this id!" });
        }
        res.json(dbYogaData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete yoga data
  deleteYoga({ params }, res) {
    yoga.findOneAndDelete({ _id: params.id })
      .then((dbYogaData) => {
        if (!dbYogaData) {
          res.status(404).json({ message: "No yoga data found with this id!" })
        }
        // remove yoga on user data
        return User.findOneAndUpdate(
          { yoga: params.id },
          { $pull: { yoga: params.id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "yoga deleted but no user with this id!" });
        }
        res.json({ message: "yoga successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};