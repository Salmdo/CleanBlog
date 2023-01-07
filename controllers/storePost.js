const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = async(req, res)=> {
    let image = {}
    if(req.files == null){
        image.name = null
    }
    else{
        image = req.files.image; //create a shortcut to req.files.image with image
        await image.mv(path.resolve(__dirname,'../public/assets/img',image.name))
    }
    console.log(req.session.userId)
    await BlogPost.create({
        ...req.body,
        image: image.name,
        userid: req.session.userId,
    },(err, blgs)=>{
       
        if(err){
            const validationErr = Object.keys(err.errors).map(key => err.errors[key].message)
            req.flash('postValidationErr', validationErr)
            return res.redirect('/create')
        }
        res.redirect('/')
    })
}