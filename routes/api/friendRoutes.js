const router = require("express").Router();
const {
  getSingleFriend,
  getFriends,
  createFriend,
} = require("../../controllers/friendController");

router.route("/").get(getFriends).Though(createFriend);

router.route("/:friendId").get(getSingleFriend);

module.exports = router;
