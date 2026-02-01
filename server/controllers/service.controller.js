import Service from "../models/service.Model.js";

//create a product
export const createService = async (req, res) => {
  const { name, description, price, image, rate, category } = req.body;
  try {
    if (!name || !price || !category || !image || !rate|| !description ) {
      return res
        .status(400)
        .json({ message: "Name, price, image, and rate are required" });
    }
    
    const newService = await Service.create({
      name,
      description,
      price,
      image,
      category,
      rate,
    });
    //201 created
    return res
      .status(201)
      .json({ newService, message: "Service created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating Service", error });
  }
};
//get all products
export const getAllService = async (req, res) => {
  try {
    const services = await Service.find();
    //in case there is o products
    if (services.length === 0) {
      return res
        .status(200)
        .json({ services: [], message: "No services found" });
    }
    return res
      .status(200)
      .json({ services, message: "services fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

//get by id
export const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
   const services = await Service.find({ category: id });
    if (!services) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res
      .status(200)
      .json({ services, message: "Service fetched successfully" });
    //200 ok
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
//delete by id
export const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }

    return res
      .status(200)
      .json({ service, message: "service deleted successfully" });
    //200 ok
  } catch (error) {
    res.status(500).json({ message: "Error deleteiong service", error });
  }
};

//update by id
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, rate,category } = req.body;
  try {
    const updatedData = {};
    if (name !== undefined) updatedData.name = name;
    if (description !== undefined) updatedData.description = description;
    if (price !== undefined) updatedData.price = price
    if (rate !== undefined) updatedData.rate = rate;
    if (image !== undefined) updatedData.image = image;
     if (category !== undefined) updatedData.category = category;

    const service = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }

    return res
      .status(200)
      .json({ service, message: "service updated successfully" });
    //200 ok
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error });
  }
};