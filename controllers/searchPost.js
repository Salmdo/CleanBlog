const BlogPost = require('../models/BlogPost')
const homeController = require('../controllers/home')
module.exports = async (req, res) => {
    let searchKey = req.body.searchKey
    console.log(searchKey.length)
    const blogposts = []
    if(searchKey.length > 0){
        const blogposts = await BlogPost.find({title:searchKey}).populate('userid')
        return res.render('index',{blogposts})
        
    }
    else{
        const blogposts = await BlogPost.find().populate('userid')
        return res.render('index',{blogposts})
    }
    
    // return homeController
}