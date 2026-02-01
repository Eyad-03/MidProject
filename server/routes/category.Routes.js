import express from 'express'
import { createCategory,getAllCategory,getCategoryById,updateCategory,deleteCategory } from '../controllers/category.Controller.js'

const router =express.Router()

router.post('/createCategory',createCategory)
router.get('/getAllCategory',getAllCategory)
router.get('/getCategoryById/:id',getCategoryById)
router.put('/updateCategory/:id',updateCategory)
router.delete('/deleteCategory/:id',deleteCategory)

export default router