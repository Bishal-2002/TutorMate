const express=require('express')
const router=express.Router()
const {isLoggedIn, validateTutor, isAuthor}=require('../middleware')
const tutors=require('../controllers/tutors')
const multer=require('multer')
const {storage}=require('../cloudinary')
const upload=multer({storage})

router.route('/')
    .get(tutors.index)
    .post(isLoggedIn, tutors.createTutorPost);

router.get('/new', isLoggedIn, tutors.renderNewForm)

router.route('/:id')
    .get(isLoggedIn, tutors.showTutorPost)
    .put(isLoggedIn, isAuthor, tutors.updateTutorPost)
    .delete(isLoggedIn, isAuthor, tutors.deleteTutorPost)

router.get('/:id/edit', isLoggedIn, isAuthor, tutors.renderEditForm)

module.exports=router