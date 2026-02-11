import express from "express";
import {
  createService,
  getAllService,
  deleteService,
  updateService,
  getServiceCategoryById,
  getServiceProviderById
} from "../controllers/service.controller.js";
import { adminOnly } from "../middleware/admin.Middleware.js";
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router();

router.get("/getAllService", protect, getAllService);

router.post("/createService", protect,  createService);

router.get("/getServiceCategoryById/:id", protect, getServiceCategoryById);

router.get("/getServiceProviderById/:id", protect, getServiceProviderById);

router.put("/updateService/:id", protect, adminOnly, updateService);

router.delete("/deleteService/:id", protect, deleteService);

export default router;
