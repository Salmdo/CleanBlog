const User = require('../models/User')
module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user ) => {
        if(error || !user )
            { return res.redirect('/') }
        // the user is a valid user, we permit the request and carry on with next()
        next() 
    })
}
