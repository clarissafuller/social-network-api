const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).Though(createThought);

router.route("/:thoughId").get(getSingleThought);

module.exports = router;
