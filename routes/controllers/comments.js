const Comment = require("../../models/comment");
const Pet = require("../../models/pets");
const Notification = require("../../models/notification")

// Create
module.exports.createComment = async (req, res, next) => {
    const { id } = req.params;
    const pet = await Pet.findById(id).populate("author");
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    comment.date = new Date(Date.now());
    pet.comments.push(comment);
    await pet.save();
    await comment.save();
    if( !(req.user._id.equals(pet.author._id)) ){ 
        const notification = new Notification();
        notification.author = req.user.username || req.user.facebookLogin.username;
        notification.authorId = req.user.id;
        notification.reciever = [];
        notification.reciever.push(pet.author.id);
        notification.postId = `/mascotas/${pet.id}`;
        notification.body = " ha comentado en tu ";
        notification.date = new Date(Date.now());
        notification.isRead = false;
        await notification.save();
        pet.author.notifications += 1;
        pet.author.save();
        if( !(req.user.commentsPets.some(x=> x._id == id)) ) {
            req.user.commentsPets.push(id);
            await req.user.save();
        }
    };
    req.flash("success", "Comentario creado!");
    res.redirect(`/mascotas/${id}`);
};

//READ UPDATE -> pets/show.ejs

//Delete
module.exports.deleteComment = async (req, res, next) => {
    const { id, commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    await Pet.findByIdAndUpdate(id, { $pull: { comments: commentId}})
    req.flash("success", "Tu comentario fue eliminado correctamente!")
    res.redirect(`/mascotas/${id}`)
};