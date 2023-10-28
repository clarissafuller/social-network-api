const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
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

// Create a virtual property `userCount` that gets the amount of comments per user
userSchema
  .virtual("userCount")
  // Getter
  .get(function () {
    return this.users.length;
  });

// Initialize our user model
const User = model("user", userSchema);

module.exports = User;
