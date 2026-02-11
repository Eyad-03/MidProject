import mongoose from "mongoose";
import Request from "../models/request.Model.js";

export const createRequest = async (req, res) => {
  const { providerId, serviceId } = req.body;
    const clientId = req.user.id
  try {
    const newRequest = await Request.create({
      provider: providerId, // Map providerId to 'provider'
      client: clientId, // Map clientId to 'client'
      service: serviceId, // Map serviceId to 'service'
    });
    return res
      .status(200)
      .json({ message: "Request sent successfully", newRequest });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getAllRequest = async (req, res) => {
    const providerId = req.user.id;
  try {
    const requests = await Request.find({ provider: providerId })
      .populate("client", "name email")
      .populate("service", "name price description")
      .sort({ createdAt: -1 });

    if (!requests) return res.status(404).json({ message: "request is empty" });

    return res
      .status(200)
      .json({ message: "fetch request successfully", requests });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
