const Notification = require("../models/notification")

const NotifCounter = async (req, res, next) => {
    if(req.user) {
        let userId = `${req.user._doc._id.toString()}`
        const notifications = await Notification.find({reciever: {$in: [userId]}, isRead: false });
        req.user.notifications = notifications.length;
    };
    next()
};

module.exports = NotifCounter;

    // notifications.forEach( async notif => { notif.isRead = true; await notif.save()});
