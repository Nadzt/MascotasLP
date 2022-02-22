// Home
module.exports.home = (req, res) => {
    req.session.returnTo = req.originalUrl; 
    res.render("home");
};

// About
module.exports.about = (req, res) => {
    res.render("about");
}