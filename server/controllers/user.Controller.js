import User from "../models/user.Model.js";

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
  console.log(id)
  console.log(typeof id)

  try {
    const userToUpdate = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      userToUpdate, message: "user done"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};