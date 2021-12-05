const { genSalt, hash, compare } = require("bcrypt");

//external imports
const router = require("express").Router();
const User = require("../models/User");

// register route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, ...rest } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Creating an user
    const newUser = await new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    //  save the user
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await compare(req.body.password, user.password);
    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
