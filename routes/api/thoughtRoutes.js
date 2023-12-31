const router = require("express").Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughId").get(getSingleThought);

module.exports = router;
