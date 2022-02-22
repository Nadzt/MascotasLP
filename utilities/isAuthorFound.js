const Found = require("../models/found")

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const pet = await Found.findById(id);
    if(!pet.author.equals(req.user._id)){
        req.flash("error", "No tiene los permisos para realizar esa accion");
        return res.redirect(`/encontradas/${id}`);
    }
    next();
};

module.exports = isAuthor;