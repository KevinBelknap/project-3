const router = require("express").Router();
const {
  createPhysical,
  getPhysicalById,
  deletePhysical,
} = require("../../controllers/physical-controller");

const {
  createCardio,
  getCardioById,
  deleteCardio,
} = require("../../controllers/cardio-controller");

// import middleware
const { authMiddleware } = require('../../utils/auth');

// on insominia: 
// choose Auth bearer, add response-body attribute and edit tag
// change request to the login api
// change filter to $. to find token
router.use(authMiddleware);

// /api/exercise/cardio
router.route("/cardio").post(createCardio);

// /api/exercise/cardio/:id
router.route("/cardio/:id").get(getCardioById).delete(deleteCardio);

// /api/exercise/Physical
router.route("/physical").post(createPhysical);

// /api/exercise/Physical/:id
router.route("/physical/:id").get(getPhysicalById).delete(deletePhysical);

module.exports = router;