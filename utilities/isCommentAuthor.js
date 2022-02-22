const Comment = require("../models/comment")

const isCommentAuthor = async (req, res, next) => {
    const { id , commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment.author.equals(req.user._id)){
        req.flash("error", "No tenes permiso para eliminar ese comentario");
        return res.redirect(`/mascotas/${id}`);
    }
    next();
};

module.exports = isCommentAuthor;