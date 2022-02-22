const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ms = require("ms")

const NotificationSchema = new Schema({
    author: String,
    authorId: String,
    reciever: [ String ],
    postId: String,
    body: String,
    date: Date,
    isFound: Boolean,
});


NotificationSchema.index({"createdAt": 1}, {expireAfterSeconds: 2592000});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
