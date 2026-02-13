import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },

    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    status: {
      type: Boolean,
      default: false
    },
  },

  {
    timestamps: true,
  },
);

const Review = mongoose.model("review", ReviewSchema);
export default Review;
