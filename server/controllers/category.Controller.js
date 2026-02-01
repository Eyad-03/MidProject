import Category from "../models/category.Model.js";

export const createCategory = async (req, res) => {
  const { name, image } = req.body;

  try {
    if (!name || !image) {
      return res.status(400).json({ message: "All Field require" });
    }

    const newCategory = await Category.create({ name, image });
    return res
      .status(200)
      .json({ message: "create category successfully", newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(404).json({ message: "category is empty" });
    }

    return res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, image },
      { new: true },
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res
      .status(200)
      .json({ updatedCategory, message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};



export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};