const User = require("../../models/user");
const Notification = require("../../models/notification");
const notificationFilter = require("../../utilities/NotificationFilter");
const TimeAgo = require("javascript-time-ago");
const es = require("javascript-time-ago/locale/es-AR.json");
TimeAgo.addLocale(es);
const timeAgo = new TimeAgo('es-AR');

// Create
module.exports.createUserForm = (req, res) => {
    res.render("users/register")
};

module.exports.createUserPost = async (req, res) => {
    try {
    const { username, password, email } = req.body;
    let avatarNum = (Math.floor(Math.random()*4) + 1);
    const avatar = `/images/avatar/avatar${avatarNum}.png`;
    const geometry = JSON.parse(req.body.geometry);
    const user = new User({username, email, avatar, geometry});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) { 
            return next(err);
        } else {
        req.flash("success", "Bienvenido/a, tu cuenta se creo correctamente");
        res.redirect("/mascotas"); }
    });
    } catch(e) {
        if (e.name === 'MongoServerError' && e.code === 11000) {
            e.message = "Ese E-Mail ya esta en uso";
        };
        req.flash("error", e.message);
        res.redirect("/registrarse");
};
};

// Read
module.exports.showUser = async (req, res) => {
    req.session.returnTo = req.originalUrl;
    const user = await User.findById(req.params.id).populate([ "userPets", "userFounds", "commentsPets", "commentsFounds" ]);
    res.render("users/show", { user } );
};

module.exports.showNotifications = async (req, res) => {
    const user = await User.findById(req.params.id);
    const notifications = await Notification.find({reciever: {$in: [req.params.id]} });
    const breaker = user.notifications;
    user.notifications = 0;
    await user.save();
    req.user.notifications = 0;
    res.render("users/notifications", { user, notifications, timeAgo, breaker } );
};

// Update
module.exports.updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render("users/edit", { user } );
};

module.exports.updateUserPost = async (req, res) => {
    const { facebook, twitter, instagram, about, geometry } = req.body;
    const user = await User.findById(req.params.id);
    user.twitter = twitter;
    user.instagram = instagram;
    if(facebook){
        if(facebook.slice(0,25) == "https://www.facebook.com/") {
            user.facebook = facebook;
        } else { 
            req.flash("error", "Tu link de facebook no fue valido, por favor, copia y pega todo el link") 
        };
    };
    user.about = about;
    if(geometry) {
        user.geometry = JSON.parse(geometry)
    };
    user.save();
    res.redirect(`/user/${user.id}`)
};
 
//Log in
module.exports.loginUserForm = (req, res) => {
    res.render("users/login");
};

module.exports.loginUserPost = (req, res) => {
    req.flash("success", "Se inicio sesion correctamente");
    const redirectUrl = req.session.returnTo || "/mascotas";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

//Log out
module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash("success", "Cerraste sesion")
    res.redirect("/")
};