import User from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, confirmPassword, role,major } = req.body;
  try {
    if (!name || !email | !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existingUser = await User.findOne({ email });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (existingUser) {
      return res.status(400).json({ message: "email already is exist" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least one number and one special character",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      major
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "email or password are incorrect, please try again" });
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
      maxAge: 3600000, 
    });

    return res
      .status(200)
      .json({ message: "Login successful", user: existingUser, token });
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};


export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Logout successful" });
};