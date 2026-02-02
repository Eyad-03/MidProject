import express from 'express'
import { createCategory,getAllCategory,getCategoryById,updateCategory,deleteCategory } from '../controllers/category.Controller.js'
import { adminOnly } from '../middleware/admin.Middleware.js'
import { protect } from '../middleware/auth.Middleware.js'
const router =express.Router()

router.post('/createCategory',protect,adminOnly,createCategory)
router.get('/getAllCategory',protect,getAllCategory)
router.get('/getCategoryById/:id',protect,getCategoryById)
router.put('/updateCategory/:id',protect,adminOnly,updateCategory)
router.delete('/deleteCategory/:id',protect,adminOnly,deleteCategory)

export default router