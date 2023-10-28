const router = require("express").Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
} = require("../../controllers/reactionController");

// /api/Reactions
router.route("/").get(getReactions).post(createReaction);

// /api/Reactions/:ReactionId
router.route("/:reactionId").get(getSingleReaction);

module.exports = router;
