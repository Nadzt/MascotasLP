const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} no puede contener HTML o simbolos de Mayor y Menor!!!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.petJoiSchema = Joi.object({
    animal: Joi.string().required().escapeHTML(),
    name: Joi.string().required().escapeHTML(),
    breed: Joi.string().required().escapeHTML(),
    sex: Joi.string().required().escapeHTML(),
    age: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    geometry: Joi.string().required(),
    date: Joi.date(),
})

module.exports.commentJoiSchema = Joi.object({
    date: Joi.date(),
    body: Joi.string().required().escapeHTML(),
})

module.exports.updatePetJoiSchema = Joi.object({
    name: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    deleteImages: Joi.array(),
    found: Joi.boolean(),
})

module.exports.foundJoiSchema = Joi.object({
    animal: Joi.string().required().escapeHTML(),
    breed: Joi.string().required().escapeHTML(),
    sex: Joi.string().required().escapeHTML(),
    age: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
    geometry: Joi.string().required(),
    date: Joi.date(),
})


module.exports.updateFoundJoiSchema = Joi.object({
    description: Joi.string().required().escapeHTML(),
    deleteImages: Joi.array(),
    found: Joi.boolean(),
})