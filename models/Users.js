const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      minLength: 10,
      maxLength: 30,
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
