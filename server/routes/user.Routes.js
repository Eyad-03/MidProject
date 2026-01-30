import express from 'express'
import { getAllUser,getUserById,deleteUser,updateUser } from '../controllers/user.Controller.js'

const router =express.Router()

router.get('/getAllUser',getAllUser)
router.get('/getUserById/:id',getUserById)
router.put('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)

export default router