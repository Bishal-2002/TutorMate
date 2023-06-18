const express=require('express')
const router=express.Router({mergeParams: true})
const ExpressError=require('../utils/ExpressError')
const Tutor=require('../models/tutor')
const Review=require('../models/review')
const {reviewSchema}=require('../schemas')
const {isLoggedIn, validateReview, isReviewAuthor}=require('../middleware')
const reviews=require('../controllers/reviews')

router.post('/', validateReview, isLoggedIn, reviews.createReview)
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviews.deleteReview)

module.exports=router