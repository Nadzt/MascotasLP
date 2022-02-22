const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utilities/wrapAsync");
const ExpressError = require("../utilities/ExpressError");
const commentsController = require("./controllers/commentsFound")
const anchorDeleteMethod = require("../utilities/anchorDeleteMethod")
const isLoggedIn = require("../utilities/isLoggedIn");
const isCommentAuthor = require("../utilities/isCommentAuthor");
const { commentJoiSchema }= require("../utilities/joiSchemas.js");

// Middleware
const validateComment = (req, res, next) =>{
    const { error } = commentJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(x => x.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
};

// Reviews
//Create
router.post("/", isLoggedIn, validateComment, wrapAsync(commentsController.createComment))

//Delete
router.get("/:commentId", anchorDeleteMethod)
router.delete("/:commentId", isLoggedIn, isCommentAuthor, wrapAsync(commentsController.deleteComment))

module.exports = router;