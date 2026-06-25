const User = require('../models/User.model');
require("dotenv").config();
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generate");

// SIGNUP
const signup = async (req, res) => {
  try {
    console.log(" Body:", req.body);
    console.log(" File:", req.file);
    let { FullName, Email, Password, Contact } = req.body;
    if (!FullName || !Email || !Password || !Contact) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Image upload failed' })
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const imagepath = req.file ? `/uploads/${req.file.filename}` : '';

    const hashedPassword = await bcrypt.hash(Password, 10);

    const createUser = await User.create({
      FullName,
      Email,
      Password: hashedPassword,
      Contact,
      Image: imagepath,
    });
    return res.status(201).json({
      user: {
        _id: createUser._id,
        FullName: createUser.FullName,
        Email: createUser.Email,
        Contact: createUser.Contact,
        Image: createUser.Image,
      },
      token: generateToken(createUser._id),
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ Email }).select("+Password");
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    return res.status(200).json({
      user: {
        _id: user._id,
        FullName: user.FullName,
        Email: user.Email,
        Contact: user.Contact,
        Image: user.Image,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const GetAllUser = await User.find().select("-Password");
    return res.status(200).json(GetAllUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const GetByIdUser = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await User.findById(id).select("-Password");
    if (!found) return res.status(404).json({ message: `User with id ${id} not found` });
    return res.status(200).json(found);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-Password");

    if (!updated) return res.status(404).json({ message: `User with id ${id} not found` });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: `User with id ${id} not found` });
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
  GetAllUser,
  GetByIdUser,
  UpdateUser,
  DeleteUser,
};

