const Pet = require("../models/pets")

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if(!pet.author.equals(req.user._id)){
        req.flash("error", "No tiene los permisos para realizar esa accion");
        return res.redirect(`/mascotas/${id}`);
    }
    next();
};

module.exports = isAuthor;