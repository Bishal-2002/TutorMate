const {tutorSchema, reviewSchema}=require('./schemas.js');
const ExpressError=require('./utils/ExpressError.js');
const Tutor=require('./models/tutor.js');
const Review=require('./models/review.js');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl
        req.flash('error','You Must Be Signed In First!')
        res.redirect('/login')
    }
    else next()
}

module.exports.isAuthor = async(req, res, next) => {
    const {id}=req.params
    const tutor=await Tutor.findById(id)
    if(!tutor.author.equals(req.user._id)){
        req.flash('error','Unauthorized Access Denied!')
        res.redirect(`/tutors/${id}`)
    }
    else next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId }=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)) {
        req.flash('error','Unauthorized Access Denied!')
        res.redirect(`/tutors/${id}`);
    }
    else  next();
}

module.exports.validateReview = (req,res,next) => {
    const {error}=reviewSchema.validate(req.body)
    if(error){
        const msg='Validation Error!'
        throw new ExpressError(msg, 400)
    }
    else next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/tutors/${id}`);
    }
    next();
}

module.exports.validateTutor = (req,res,next) => {
    const {error} = tutorSchema.validate(req.body);
    // console.log(req.body)
    if(error){
        const msg='Validation Error! Please Insert Form Data Correctly!'
        throw new ExpressError(error.message,400)
    }
    else next()
}

module.exports.storeReturnTo = (req, res, next) => {
    if(req.session.returnTo)    res.locals.returnTo=req.session.returnTo
    next()
}