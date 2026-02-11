import Review from "../models/Review.Model.js";

export const createReview = async (req, res) => {
  const { review, rating, userId } = req.body;
  try {
    if (!review) return res.status(400).json({ message: "The review Empty" });

    const newReview = await Review.create({ review, rating, userId });
    return res.status(201).json({ newReview });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews) return res.status(400).json({ message: "review is empty" });
    return res
      .status(200)
      .json({ message: "fetch review successfully", reviews });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const updateReviewStatue = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(`Received status: ${status}, id: ${id}`);
  try {
    const newStatus = status === "accept";
    const updateStatue = await Review.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true },
    );

    return res.status(200).json({ message: "Status updated", updateStatue });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const deleteReview = async (req,res) => {
  const { id } = req.params;

  try {
    const review = await Review.findByIdAndDelete(id);

    if (!review) return res.status(404).json({ message: "review not found" });

    return res.status(200).json({ message: "delete review successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
