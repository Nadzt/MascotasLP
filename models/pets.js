const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200,h_120,c_fill');
});


ImageSchema.virtual('indexDisplay').get(function () {
    return this.url.replace('/upload', '/upload/w_400,h_400,c_fill');
});

const opts = { toJSON: { virtuals: true } };

const PetSchema = new Schema({
    animal: {
        type: String,
        enum: ["perro", "gato"],
    },
    name: String,
    breed: String,
    sex: String,
    age: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    location: String,
    description: String,
    date: Date,
    // microchip: Boolean,
    // collar: Boolean,
    // chapa: Boolean,
    images: [ImageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
        type: Schema.Types.ObjectId,
        ref: "Comment"
        }
    ],
    found: Boolean,
}, opts);

module.exports = mongoose.model('Pet', PetSchema);