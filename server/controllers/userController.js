const User = require('../models/User');

const createUsers = async (req, res) => {
    
  const names = ['Rahul', 'Kamal', 'Sanak', 'Amit', 'Deepak', 'Nisha', 'Priya', 'Ravi', 'Sita', 'Mohit'];
  const users = names.map(name => ({ name }));
  await User.deleteMany({});
  await User.insertMany(users);
  res.status(201).send({ message: 'Users created' });
};

const claimPoints = async (req, res, io) => {
  const { userId } = req.params;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).send({ message: 'User not found' });

  user.totalPoints += randomPoints;
  await user.save();

  const users = await User.find().sort({ totalPoints: -1 });
  const rankedUsers = users.map((u, index) => ({
    _id: u._id,
    name: u.name,
    totalPoints: u.totalPoints,
    rank: index + 1
  }));

  io.emit('updateRankings', rankedUsers);

  res.status(200).send({
    message: 'Points claimed',
    pointsAwarded: randomPoints,
    user: {
      _id: user._id,
      name: user.name,
      totalPoints: user.totalPoints
    }
  });
};

const getRankings = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const rankedUsers = users.map((u, index) => ({
    _id: u._id,
    name: u.name,
    totalPoints: u.totalPoints,
    rank: index + 1
  }));
  res.status(200).send(rankedUsers);
};
const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};
// Add a single user
const addUser = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const user = new User({ name, totalPoints: 0 });
    await user.save();
    res.status(201).json({ message: "User added", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { createUsers, claimPoints, getRankings, getAllUsers,addUser };
