const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionName: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#008080",
    },
    createdAt: Date,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

reactionSchema
  .virtual("getReaction")
  // Getter
  .get(function () {
    return `color: ${this.color}`;
  });

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
