module.exports = (req, res) =>{
    req.session.destroy(() =>{      //destroy all session data
        res.redirect('/') })
}