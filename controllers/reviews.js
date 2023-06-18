const Tutor=require('../models/tutor')
const Review=require('../models/review')

module.exports.createReview = async(req,res,next) => {
    try{
        const {id}=req.params
        const tutor= await Tutor.findById(id)
        const review=new Review(req.body.review)
        tutor.reviews.push(review)
        review.author=req.user
        await review.save()
        await tutor.save()
        req.flash('success','Successfully Created a Review!')
        res.redirect(`/tutors/${tutor._id}`);
    }
    catch(e){
        next(e)
    }
}

module.exports.deleteReview = async(req,res,next) => {
    try{
        const {id, reviewId}=req.params
        await Review.findByIdAndDelete(reviewId)
        await Tutor.findByIdAndUpdate(id, {
            $pull: {
                reviews: reviewId
            }
        })
        req.flash('success','Successfully Deleted The Review!')
        res.redirect(`/tutors/${id}`)
    } 
    catch(e){
        next(e)
    }
}