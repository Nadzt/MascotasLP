const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        required: true,
    },
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
    twitter: {
        type: String,
    },
    facebook: {
        type: String,
    },
    instagram: {
        type: String,
    },
    about: {
        type: String,
    },
    notifications: {
        type: Number,
        default: 0,
    },
    userPets: [
        {
        type: Schema.Types.ObjectId,
        ref: "Pet"
        }
    ],
    userFounds: [
        {
        type: Schema.Types.ObjectId,
        ref: "Found"
        }
    ],
    commentsPets: [
        {
        type: Schema.Types.ObjectId,
        ref: "Pet"
        }
    ],
    commentsFounds: [
        {
        type: Schema.Types.ObjectId,
        ref: "Found"
        }
    ],
});

var options = {
    errorMessages: {
        UserExistsError: "Ese Nombre de usuario no esta disponible",
    }
}

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserSchema);