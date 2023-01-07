const NewUser = require('../models/User')

module.exports = (req, res) => {
    NewUser.create(req.body,(err, newU) => {
        if(err){
            // The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names
            //E.g. it returns Array["attribute1", "attribute2", "attribute3"]
            // The map() method creates a new array populated with the results of calling a provided function
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message)
            // req.session.validationErrors = validationErrors
            // In flash(), specify that validation errors will be stored in the 'validationErrors' key
            req.flash('validationErrors',validationErrors)
            //  flash req.body which contains the data keyed into the form, after that fillter the form with the data, so that the customer don't need to re-type data
            req.flash('data',req.body)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}