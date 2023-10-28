const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");
const reactionRoutes = require("./reactionRoutes");
const friendRoutes = require("./friendRoutes");
const userRoutes = require("./userRoutes");

router.use("/thoughts", thoughtRoutes);
router.use("/reactions", reactionRoutes);
router.use("/friends", friendRoutes);
router.use("/users", userRoutes);

module.exports = router;
