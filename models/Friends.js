const { Schema, model } = require("mongoose");

// Schema to create Friend model
const friendSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
    text: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that gets the amount of comments per friend
friendSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our friend model
const Friend = model("friend", friendSchema);

module.exports = Friend;
