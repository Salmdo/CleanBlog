module.exports = (req, res) =>{
    if(req.session.userId){
        //QUESTION: Why do we need return here?
        return res.render('create',{
            postValidationError: req.flash('postValidationErr'),
            createPost: true
        }) 
    }
    res.redirect('/auth/login')
}