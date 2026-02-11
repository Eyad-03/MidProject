import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    status: {
      type: Boolean,
      default:false
    },
  },

  {
    timestamps: true,
  },
);

const Request = mongoose.model("request", requestSchema);
export default Request;
