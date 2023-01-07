const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = (req, res)=> {

    let image = req.files.image; //create a shortcut to req.files.image with image

    //image.mv moves the uploaded file to public/assets/img directory with the name from image.name
    // Only where using await should async be declared
    image.mv(path.resolve(__dirname,'public/assets/img',image.name),async (error)=>{

        // console.log is for logging strings or simple values => format the output, as a json 
        // console.log("blogPost: %j", req)

        //'await' means that it awaits the completion of the current line before the below line can be executed
        //If the req.body containts all attributes of the object => BlogPost.create(req.body) AND do not need to write BlogPost.create(...req.body)
        await BlogPost.create({
            ...req.body,
            image: image.name
        })
        res.redirect('/')
    })
}