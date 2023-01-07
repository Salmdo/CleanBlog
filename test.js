const mongoose = require('mongoose')

// import the BlogPost 
const BlogPost = require('./models/BlogPost')

//proceed to connect to the database
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

// create a new BlogPost document in our database
// first argument, we pass in the data for the blogpost document
// the 2nd argument, we pass in a call back function which is called when create finishes execution
// Mongoose gives us any error in the error argument if there was any during the create operation
// It also return us the newly created post in the blogpost argument
BlogPost.create({
    title: 'title here',
    body: 'body here'
}, (error, blogpost) =>{console.log(error,blogpost)
})

// select all documents in a collection
BlogPost.find(
   {},(error, blogspot) => console.log(error,blogspot)
)

// find all documents in a collection with a particular title
BlogPost.find(
    { title:'The Mythbuster’s Guide to Saving Money on Energy Bills'},
    (error, blogspot) =>{console.log(error,blogspot)}
)
// find all documents in a collection with ‘ The ’ in the title
BlogPost.find(
    {title:/The/}, (error, blogspot) =>{console.log(error,blogspot)}
)

// retrieve single document with unique id _id
var id = "63b5c276627e936f323a41f0";
BlogPost.findById(id, (error, blogspot) =>{console.log(error,blogspot)})

// update a record
var id = "63b5c276627e936f323a41f0";
BlogPost.findByIdAndUpdate(id,
    { title:'Updated title'},
    (error, blogspot) =>{console.log(error,blogspot)}
)

//Delete a record
var id = "63b5c276627e936f323a41f0";
BlogPost.findByIdAndDelete(id, (error, blogspot) =>{ console.log(error,blogspot)})
