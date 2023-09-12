const router = require("express").Router();
const userRoutes = require("./user-routes");
const fitnessRoutes = require("./fitness-routes");

router.use("/user", userRoutes);
router.use("/exercise", fitnessRoutes);

module.exports = router;