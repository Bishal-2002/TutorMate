const Tutor = require('../models/tutor')
const {cloudinary} = require('../cloudinary') 

module.exports.index = async(req,res,next) => {
    try{
        const tutors=await Tutor.find({})
        res.render('tutors/index',{tutors})
    }
    catch(e){
        next(e)
    }
}

module.exports.createTutorPost = async(req,res,next) => {
    try{
        const {tutor}=req.body;
        const newTutor=new Tutor(tutor)
        newTutor.author=req.user
        const subjectString=req.body.subjects
        const subjectArr=subjectString.split(', ')
        newTutor.subjects=subjectArr
        await newTutor.save()
        req.flash('success', 'Successfully Created a Post!')
        res.redirect(`/tutors/${newTutor._id}`)
    }
    catch(e){
        next(e)
    }
}

module.exports.renderNewForm = (req,res) => {
    res.render('tutors/new')
}

module.exports.showTutorPost = async (req, res, next) => {
    try{
        const tutor=await Tutor.findById(req.params.id).populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        }).populate('author')

        if(!tutor){
            req.flash('error','Post Not Found!')
            res.redirect('/tutors')
        }
        else{
            let subjects=""
            for(let subject of tutor.subjects) subjects=subjects+subject+", "
            subjects=subjects.substring(0,subjects.length-2)
            res.render('tutors/show', {tutor, subjects})
        }
    }
    catch(e){
        next(e);
    }
}

module.exports.updateTutorPost = async (req, res, next) => {
    try{
        const {id}=req.params
        const tutor = await Tutor.findByIdAndUpdate(id, {...req.body.tutor})
        const subjectString=req.body.subjects
        const subjectArr=subjectString.split(', ')
        tutor.subjects=subjectArr
        await tutor.save();
        req.flash('success','Successfully Updated Post!')
        res.redirect(`/tutors/${tutor._id}`)
    }
    catch(e){
        next(e)
    }
}

module.exports.deleteTutorPost = async (req, res , next) => {
    try{
        const {id}=req.params
        await Tutor.findByIdAndDelete(id)
        req.flash('success','Successfully Deleted Post!')
        res.redirect('/tutors')
    }
    catch(e){
        next(e)
    }
}

module.exports.renderEditForm = async(req, res, next) => {
    try{
        const tutor=await Tutor.findById(req.params.id)
        if(!tutor){
            req.flash('error','Post Not Found!')
            res.redirect('/tutors')
        }
        else{
            let subjects=""
            for(let subject of tutor.subjects) subjects=subjects+subject+", "
            subjects=subjects.substring(0,subjects.length-2)
            res.render('tutors/edit', {tutor, subjects})
        }
    }
    catch(e){
        next(e)
    }
}