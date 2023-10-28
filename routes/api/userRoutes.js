const router = require("express").Router();
const {
  getSingleUser,
  getUsers,
  createUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).Though(createUser);

router.route("/:userId").get(getSingleUser);

module.exports = router;
