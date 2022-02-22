const Found = require("../../models/found");
const User = require("../../models/user");
const Notification = require("../../models/notification");
const { cloudinary, storageFound }= require("../../utilities/cloudinary");

// Time-ago, hace cuanto se publico el comment, en es-Ar
const TimeAgo = require("javascript-time-ago");
const es = require("javascript-time-ago/locale/es-AR.json");
TimeAgo.addLocale(es);
const timeAgo = new TimeAgo('es-AR');




module.exports.index = async (req, res) => {
    req.session.returnTo = req.originalUrl;
    if(req.user != undefined) {
        pets = (await Found.find({ geometry : {$near: {$geometry: {type: "Point", coordinates: req.user.geometry.coordinates }}}}).limit(500) );
        res.render("found/index", { pets });
    } else {
        pets = (await Found.find().sort({$natural: 1}).limit(500) ).reverse();
        res.render("found/index", { pets });
    };
};

module.exports.indexFilter = async (req, res) => {
    let filtros = {};
    const {animal, breed, sex, age, searchBy} = req.body;
    if(animal != "Cualquiera") {filtros.animal = `${animal}`}; 
    if(breed != "Cualquiera") {filtros.breed = `${breed}`}; 
    if(sex != "Cualquiera") {filtros.sex = `${sex}`};
    if(age != "Cualquiera") {filtros.age = `${age}`};
    if(searchBy == "cercania" ) {
        filtros.geometry = {$near: {$geometry: {type: "Point", coordinates: req.user.geometry.coordinates }}};
        const pets = (await Found.find(filtros).limit(500));
        res.render("found/index", { pets });
    } else {
        const pets = (await Found.find(filtros).limit(500).sort({$natural: -1}) );
        res.render("found/index", { pets });
    }
};

// Create
module.exports.createForm = (req, res) =>{
    res.render("found/new");
};


module.exports.createPost = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const rawpet = req.body;
    rawpet.geometry = JSON.parse(rawpet.geometry);
    const newpet = new Found(rawpet)
    newpet.author = req.user._id
    newpet.images = req.files.map(f => ({ url: f.path, filename: f.filename}));    
    newpet.date = new Date(Date.now());
    newpet.found = false;
    await newpet.save();
    user.userFounds.push(newpet);
    await user.save();
    req.flash("success", "Ya se publico la mascota que encontraste!");
    res.redirect(`/encontradas/${newpet._id}`);
};

// Read
module.exports.showFound = async (req, res, next) => {
    req.session.returnTo = req.originalUrl; 
    const { id } = req.params;
    const pet = await Found.findById(id).populate({
        path: "comments",
        populate: {
            path: "author",
        },
    }).populate("author");
    if(!pet) {
        req.flash("error", "No se encontro esa pagina!");
        return res.redirect("/encontradas")
    };
    res.render("found/show", { pet, msg: req.flash("success"), timeAgo });
};

//Update
module.exports.updateForm = async (req, res, next) =>{
    const { id } = req.params;
    const pet = await Found.findById(id);
    if(!pet) {
        req.flash("error", "No se encontro esa Mascota!");
        return res.redirect("/encontradas")
    };
    res.render("found/edit", { pet });
};

module.exports.updatePost = async (req, res, next) =>{
    const { id } = req.params;
    const valueBefore = await Found.findById(id).populate({
        path: "comments",
        populate: {
            path: "author",
        },
    });
    const pet = await Found.findByIdAndUpdate(id, {...req.body}, { new: true }).populate("author");
    const newimgs = req.files.map(f => ({ url: f.path, filename: f.filename}));
    pet.images.push(...newimgs);
    await pet.save();
    let commentAuthors = valueBefore.comments.map((comment, index, array) => {
        if ( comment.author.id != pet.author.id ) {
            return comment.author._id;
        }
    });

    commentAuthors = commentAuthors.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) === index && item != undefined;
    });
    
    if( valueBefore.found != pet.found ){
        const notification = new Notification();
        notification.author = pet.author.username;
        notification.authorId = pet.author.id;
        notification.reciever = [];
        commentAuthors.forEach(x => { notification.reciever.push(x) });
        notification.postId = `/encontradas/${pet.id}`;
        notification.body = " marcó que se encontro al dueño de una mascota publicada en la que comentaste! ";
        notification.date = new Date(Date.now());
        notification.isFound = true;
        await notification.save();
        commentAuthors.forEach(async x => {
            let resUser = await User.findById(x);
            resUser.notifications += 1;
            resUser.save();
        })
    };

    if(req.body.deleteImages){
        if( req.body.deleteImages.length < pet.images.length ) {
            for(let filename of req.body.deleteImages){
                await cloudinary.uploader.destroy(filename);
            }
            await pet.updateOne({ $pull: {images: {filename: { $in: req.body.deleteImages }}}});
        } else {
            req.flash("error", "No se pueden eliminar todas las fotos de una publicacion!")
            return res.redirect(`/encontradas/${pet._id}`)
        }
    };
    req.flash("success", "Publicacion actualizada!");
    res.redirect(`/encontradas/${pet._id}`);
};

// Delete
module.exports.deleteFound = async (req, res, next) => {
    const { id } = req.params;
    await Found.findByIdAndDelete(id);
    await User.findByIdAndUpdate(req.user.id, { $pull: { userFounds: id} })
    req.flash("success", "Se elimino tu publicacion!")    
    res.redirect("/encontradas")
};