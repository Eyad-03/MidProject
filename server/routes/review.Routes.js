import express from 'express'
import { createReview,getAllReviews,updateReviewStatue,deleteReview,getAllReviewAccepted } from '../controllers/Review.Controller.js'

const router =express.Router()

router.post('/review',createReview)
router.get('/getAllReviews',getAllReviews)
router.get('/getAllReviewAccepted',getAllReviewAccepted)
router.put('/updateReviewStatue/:id',updateReviewStatue)
router.delete('/deleteReview/:id',deleteReview)

export default router