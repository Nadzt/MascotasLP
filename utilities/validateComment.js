const ExpressError = require("./ExpressError")
const { commentJoiSchema }= require("./joiSchemas");


validateComment = (req, res, next) => {
    const { error } = commentJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(x => x.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
};

module.exports = validateComment;