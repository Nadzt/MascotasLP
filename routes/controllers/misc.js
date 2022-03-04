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