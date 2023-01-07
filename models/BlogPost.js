// Models are defined through the Schema interface
// A schema represents how a collection looks like
const mongoose = require('mongoose')
const uniqueValitator = require('mongoose-unique-validator')
const BlogPostSchema = new mongoose.Schema(
    { 
        title: {
            type: String,
            required:[true,"Please provide title"],
            unique: true
        },
        body: String,
        userid:{
            type: mongoose.Schema.Types.ObjectId, //means that the value is supposed to be a valid Mongo object id
            ref: 'User',                        //pecify User to refer to the User collection
            required: true
        },
        datePosted: { /* can declare property type with an object like this because we need 'default' */
            type: Date,
            default: new Date(),
            required: true
        },
        image: {
            type: String,
            required: [true, "Please provide image"]
        }
})

BlogPostSchema.plugin(uniqueValitator)
//We access the database via mongoose.model
// first argument is the singular name of the collection your model is for
// Mongoose automatically looks for the plural version of your model name
// Mongoose will create the model for our BlogPosts collection
const BlogPost = mongoose.model('BlogPost',BlogPostSchema)

// export the BlogPost variable for other files require this file, they know to grab BlogPost
// can export only one variable
module.exports = BlogPost