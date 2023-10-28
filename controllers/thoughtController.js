const { Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const Thoughts = await Thought.find().populate({
        path: "reactions",
        select: "-__v",
      });

      res.json(Thoughts);
    } catch (err) {
      console.error({ message: err });
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const Thought = await Thought.findOne({
        _id: req.params.ThoughtId,
      }).populate({ path: "reactions", select: "-__v" });

      if (!Thought) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json(Thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new Thought
  async createThought(req, res) {
    try {
      const Thought = await Thought.create(req.body);
      res.json(Thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
