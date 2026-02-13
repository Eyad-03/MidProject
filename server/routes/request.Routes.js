import express from 'express'
import {createRequest,getAllRequest,updateStatus,deleteRequest} from '../controllers/request.Controller.js'
import { protect } from "../middleware/auth.Middleware.js";
const router =express.Router()

router.post('/createRequest',protect,createRequest)
router.get('/getAllRequest',protect,getAllRequest)
router.put('/updateStatus/:id',updateStatus)
router.delete('/deleteRequest/:id',deleteRequest)

export default router