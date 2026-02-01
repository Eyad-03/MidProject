import express from "express";
import {
  createService,
  getAllService,
  getServiceById,
  deleteService,
  updateService,
} from '../controllers/service.controller.js'


const router = express.Router();

router.get("/getAllService", getAllService);

router.post("/createService",  createService);

router.get("/getServiceById/:id",  getServiceById);

router.put("/updateService/:id",  updateService);

router.delete("/deleteService/:id", deleteService);

export default router;