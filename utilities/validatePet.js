const ExpressError = require("./ExpressError")
const { petJoiSchema }= require("./joiSchemas");


validatePet = (req, res, next) => {
    const { error } = petJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(x => x.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
};

module.exports = validatePet;