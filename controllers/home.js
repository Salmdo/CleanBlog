const BlogPost = require('../models/BlogPost.js')
module.exports = async(req,res)=>{
    //populate('userid') automatically references the specified document with the userid in the collection
    const blogposts = await BlogPost.find().populate('userid')
    
    //res.render(`index’) will look in a 'views' folder for the file index.ejs
    //2nd parameter is the data back to the client browser
    res.render('index',{
        // blogposts: blogposts //the key name and value name are the same => shorten it to 'blogposts'
        blogposts
    })
}