const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionName: {
      type: String,
      required: true,
    },
    reactions: [String], // Define an array field to store reactions
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

reactionSchema.virtual("reactionCount").get(function () {
  // Calculate the number of reactions in the array
  return this.reactions.length;
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
