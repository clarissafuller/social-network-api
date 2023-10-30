const { Schema, model } = require("mongoose");

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

// Create a virtual property `thoughtCount` that gets the number of thoughts per user
userSchema.virtual("thoughtCount").get(function () {
  return this.thoughts.length;
});

const User = model("User", userSchema);

module.exports = User;
