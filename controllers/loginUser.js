const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = (req, res) => {
    // extract the username and password from the user login form with req.body
    const { username, password } = req.body;
    User.findOne({username:username}, (error,user) => {
        if (user){
            // console.log("DB info %j", user)
            //QUESTION: why it doesn't need to decrypt 10 times? As it's encrypted 10 times?
            bcrypt.compare(password, user.password, (err, same) =>{
                // if passwords match
                if(same){ 
                    // session package saves userId on the user’s browser
                    req.session.userId = user._id
                    res.redirect('/') 
                }
                else{
                    req.flash('loginError', 'Password is incorrect')
                    req.flash('usernamEntered',username) 
                    res.redirect('/auth/login') 
                }
             })
        } else{
            req.flash('loginError', 'Username is incorrect')
            res.redirect('/auth/login') } 
    })
}
