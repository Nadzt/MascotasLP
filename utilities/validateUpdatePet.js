const ExpressError = require("./ExpressError")
const { updatePetJoiSchema }= require("./joiSchemas");


validateUpdatePet = (req, res, next) => {
    const { error } = updatePetJoiSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(x => x.message).join(",")
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
};

module.exports = validateUpdatePet;