const ExpressError = require("./ExpressError")
const { updateFoundJoiSchema }= require("./joiSchemas");


validateUpdateFound = (req, res, next) => {
    const { error } = updateFoundJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(x => x.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
};

module.exports = validateUpdateFound;