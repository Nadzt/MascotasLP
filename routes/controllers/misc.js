const User = require("../../models/user");
const Found = require("../../models/found");
const Pet = require("../../models/pets");

// Terminos y condiciones
module.exports.terminos = (req, res) => {
    res.render("ToS/TerminosyC");
};

// Politica de privacidad
module.exports.politica = (req, res) => {
    res.render("ToS/privacyPolicy");
}

// Contacto
module.exports.contact = (req, res) => {
    res.render("misc/contact");
}

// About us
module.exports.about = (req, res) => {
    res.render("misc/about");
}

// About us
module.exports.admin = (req, res) => {
    let pets = await Pet.count()  
    let founds = await Found.count()  
    let users = await User.count()  
    res.render("misc/admin", { pets, founds, users });
}