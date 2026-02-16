import User from "../models/user.Model.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToDelete = await User.findByIdAndDelete(id);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  console.log("updateUser req.body:", { name, email });
  console.log(id);
  console.log(typeof id);

  try {
    const userToUpdate = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true },
    );
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      userToUpdate,
      message: "user done",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {

  const { id } = req.params;
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found!" });

    const isCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isCorrect)
      return res.status(400).json({ message: "old password is not correct" });

    if (newPassword !== confirmNewPassword || oldPassword === newPassword) {
      return res.status(400).json({
        message:
          "passwords does not mach or the new password is the same as the old one",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { new: true },
    );
    return res.status(200).json({ message: "password changed succeefully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInfo = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found!" });

    await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true },
    );

    return res.status(200).json({ message: "Change Profile Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInfoProvider = async (req, res) => {
  const { name, major } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found!" });

    const updateProvider = await User.findByIdAndUpdate(
      id,
      { name, major },
      { new: true },
    );
    return res.status(200).json({ message: "Change Profile Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
