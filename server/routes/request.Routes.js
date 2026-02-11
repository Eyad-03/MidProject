import express from 'express'
import {createRequest,getAllRequest} from '../controllers/request.Controller.js'
import { protect } from "../middleware/auth.Middleware.js";
const router =express.Router()

router.post('/createRequest',protect,createRequest)
router.get('/getAllRequest',protect,getAllRequest)

export default router