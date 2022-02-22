const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl 
        req.flash("error", "Necesita iniciar sesion!");
        return res.redirect("/login")
    }
    next()
};

module.exports = isLoggedIn;