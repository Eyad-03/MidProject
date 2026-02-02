import express from "express";
import {
  createService,
  getAllService,
  getServiceById,
  deleteService,
  updateService,
} from "../controllers/service.controller.js";
import { adminOnly } from "../middleware/admin.Middleware.js";
import { protect } from "../middleware/auth.Middleware.js";

const router = express.Router();

router.get("/getAllService", protect, getAllService);

router.post("/createService", protect, adminOnly, createService);

router.get("/getServiceById/:id", protect, getServiceById);

router.put("/updateService/:id", protect, adminOnly, updateService);

router.delete("/deleteService/:id", protect, adminOnly, deleteService);

export default router;
