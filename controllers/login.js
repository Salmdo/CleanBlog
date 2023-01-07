module.exports = (req,res) => {res.render('login',{
    loginError: req.flash('loginError'),
    usernamEntered: req.flash('usernamEntered')
    }
)} 