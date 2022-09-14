const User = require("../model/User");
const bcrypt = require("bcryptjs");

//get all users
const getAllUser = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status.json({ message: "No user found" });
  }
  return res.status(200).json({ users });
};

// create a new user
const signup = async (req, res) => {
  const { name, email, password, blogs } = req.body;

  //check if user already exits
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Instead Login" });
  }

  const hashedPassword = bcrypt.hashSync(password);

  // add to the database
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//lgoin
const login = async (req, res, next) => {
  const { name, email, password } = req.body;
  //check if user already exits
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Could not find user" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ message: "Login Successful", user: existingUser });
};

module.exports = {
  getAllUser,
  signup,
  login,
};
