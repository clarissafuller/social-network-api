const connection = require("../config/connection");
const { Thought, Reaction, User, Friend } = require("../models");
// Import functions for seed data
const { getRandomColor, getRandomThought, genRandomIndex } = require("./data");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the collections if they exist
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  let reactionCheck = await connection.db
    .listCollections({ name: "reactions" })
    .toArray();
  if (reactionCheck.length) {
    await connection.dropCollection("reactions");
  }

  // Empty arrays for randomly generated posts and tags
  const reactions = [];
  const thoughts = [];
  const users = [];
  const friends = [];

  //TODO: create a function to generate 10 random users with random friends to each other
  const generateRandomUser = () => {
    const username = Math.random().toString(36).substring(2, 12);
    const email = `${username}@example.com`;
    const password = Math.random().toString(36).substring(2, 12);

    return { username, email, password };
  };

  const createFriendships = (userList) => {
    const friendCount = Math.min(10, userList.length - 1); // Limit to 10 friends per user
    for (const user of userList) {
      const randomFriends = getRandomFriends(userList, user, friendCount);
      user.friends = randomFriends;
    }
  };

  //Create a looping function to generate random user with username, email, and password
  //create random friend relationships between users
  const getRandomFriends = (userList, user, friendCount) => {
    const randomFriends = [];
    while (randomFriends.length < friendCount) {
      const randomUser = userList[Math.floor(Math.random() * userList.length)];
      if (randomUser !== user && !user.friends.includes(randomUser._id)) {
        randomFriends.push(randomUser._id);
      }
    }
    return randomFriends;
  };

  // Function to make a thought object and push it into the thoughts array
  const makeThought = (text) => {
    thoughts.push({
      published: Math.random() < 0.5,
      text,
      reactions: [reactions[genRandomIndex(reactions)]._id],
    });
  };

  // Create 10 random users and push them into the users array
  for (let i = 0; i < 10; i++) {
    const user = generateRandomUser();
    users.push(user);
  }

  // Create friend relationships between users
  createFriendships(users);

  // Wait for users to be inserted into the database
  await User.collection.insertMany(users);

  // For each of the users, create random thoughts and insert them into the thoughts array
  users.forEach((user) => {
    for (let i = 0; i < 10; i++) {
      makeThought(getRandomThought(50), user._id);
    }
  });

  // Insert the thoughts array into the database
  await Thought.collection.insertMany(thoughts);

  // Log out a pretty table for users, reactions, and thoughts
  console.table(users, ["username", "email"]);
  console.table(reactions);
  console.table(thoughts, ["published", "reactions", "_id"]);

  console.timeEnd("seeding");
  process.exit(0);
});
