const User = require("../models/user")

const isSameUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user._id.equals(req.user._id)){
        req.flash("error", "No tiene los permisos para realizar esa accion");
        return res.redirect(`/user/${id}`);
    }
    next();
};

module.exports = isSameUser;