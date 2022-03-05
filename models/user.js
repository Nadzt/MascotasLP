const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: {username: {$type: "string"}}
        },
    },
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
            partialFilterExpression: {email: {$type: "string"}}
        },
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
    isAdmin: {
        type: Boolean,
        default: false,
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
    facebookLogin: {
        id: {
            type: String,
        },
        token: {
            type: String,
        },
        username: {
            type: String,
        },
        avatar: {
            type: String,
        },
    },
});

var options = {
    errorMessages: {
        UserExistsError: "Ese Nombre de usuario no esta disponible",
    }
}

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserSchema);