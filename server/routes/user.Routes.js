import express from 'express'
import { getAllUser,getUserById,deleteUser,updateUser,updatePassword,updateInfo,updateInfoProvider } from '../controllers/user.Controller.js'
import { adminOnly } from '../middleware/admin.Middleware.js'
import { protect } from '../middleware/auth.Middleware.js'
const router =express.Router()

router.get('/getAllUser',protect,adminOnly,getAllUser)
router.get('/getUserById/:id',protect,getUserById)
router.put('/updateUser/:id',protect,updateUser)
router.put('/updatePassword/:id',updatePassword)
router.put('/updateInfo/:id',updateInfo)
router.put('/updateInfoProvider/:id',updateInfoProvider)
router.delete('/deleteUser/:id',protect,adminOnly,deleteUser)

export default router