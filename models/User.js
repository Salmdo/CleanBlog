const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type:  String,
        required: [true,'Please provide username'],
        unique: true        //Mongoose checks username is unique before saving it to DB
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }
})
UserSchema.plugin(uniqueValidator);

// with UserSchema.pre('save',function()), before save the collection to DB
//, Mongoose should execute the function passed into the 2nd argument
UserSchema.pre('save',function(next){
    const user = this

    // bycrypt.hash: hash the password
    //10: specifies the number of rounds of hashing to take place => encrypted 10 times
    bcrypt.hash(user.password, 10,(err, hash)=>{
        user.password = hash
        next()
    })
})

const User = mongoose.model('User',UserSchema)
module.exports = User