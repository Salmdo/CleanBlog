const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload') //middleware to uploaded files to server
const expressSession = require('express-session')
const flash = require('connect-flash');

const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const searchPostController = require('./controllers/searchPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

// the middleware are executed for all request
app.use(fileUpload())                   //register the package in Express
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// secret string is used by the express-session package to sign 
//and encrypt the session ID cookie being shared with the browser
app.use(expressSession({ secret: 'keyboard cat' }))
app.use(flash()) 

//the middleware is applied for a specific request
// const validateMiddleware = require("./middleware/validationMiddleware");
// app.use('/posts/store',validateMiddleware)
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

global.loggedIn = null;
//QUESTION: Does it all use callbacks have 'next'??
app.use("*", (req, res, next) => {     //with the wildcard *, this middleware should be executed for all requests
    loggedIn = req.session.userId;  //it assigns loggedIn to req.session.userId
    next()
});

//we tell Express to use EJS as our templating engine
//thus any file ending in .ejs should be rendered with the EJS package
app.set('view engine','ejs')

app.listen(4000, ()=> { console.log("My app listening on port 4000")})

//define a connection with mongoose.connect
//the parameter host and database name
//MongoDB will automatically create this database for us if it does not exist
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

app.get('/',homeController)
app.get('/create',authMiddleware,newPostController)    
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)
app.post('/posts/search', searchPostController)
app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController) //call the middleware before calling newPostController
app.post('/user/register',redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)
app.post('/user/login',redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout', logoutController)
// With this middleware like route, Express will go through all the routes and 
// if it can't find one that matches, it will render the not found page
app.use((req, res) => res.render('notfound'));

