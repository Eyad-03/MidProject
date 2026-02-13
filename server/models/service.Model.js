import mongoose from "mongoose";
//name, desc, price, thumbnail, stock,
const serviceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true, 
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    rate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Service = mongoose.model("Service", serviceSchema);

export default Service;
