import mongoose from "mongoose";
import Request from "../models/request.Model.js";

export const createRequest = async (req, res) => {
  const { providerId, serviceId } = req.body;
  const clientId = req.user.id;
  try {
    const newRequest = await Request.create({
      provider: providerId, 
      client: clientId, 
      service: serviceId, 
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

    const validRequests = requests.filter(req => req.client && req.service);

    return res
      .status(200)
      .json({ message: "fetch request successfully", requests:validRequests });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedStatus = await Request.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if(!updatedStatus)
    {
      return res.status(400).json({message:'request not found'})
    }

    return res.status(200).json({message:"update status successfully",updatedStatus})
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


export const deleteRequest =async(req,res)=>
{
const {id}=req.params

try{

  const deletedRequest = await Request.findByIdAndDelete(id)
  if(!deletedRequest)
  {
    return res.status(400).json({message:"Request not found"})
  }

  return res.status(200).json({message:"Request is delete"})

}
catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }

}