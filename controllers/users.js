const User=require('../models/user')

module.exports.renderRegisterForm = (req,res) => {
    res.render('users/register')
}

module.exports.register = async(req,res,next) => {
    try{
        const {username,email,password,phone}=req.body
        const user=new User({email,username,phone})
        const registeredUser=await User.register(user,password)
        req.login(registeredUser, (err) => {
            if(err)  next(err)
            else{
                req.flash('success','Welcome to TutorMate!')
                res.redirect('/tutors')
            }
        })
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req,res) => {
    res.render('users/login')
}

module.exports.login = (req,res) => {
    const redirectUrl=res.locals.returnTo || '/tutors';
    req.flash('success',`Welcome Back, ${req.user.username}!`)
    res.redirect(redirectUrl)
}

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err)     next(err)
        else{
            req.flash('success', 'Good Bye! Logging You Out...')
            res.redirect('/tutors')
        }
    })
}