
function notificationFilter(notificationArray) {
    let unreadNotifications = [];
    for(let notification of notificationArray){
        notification.isRead === false;
        unreadNotifications.push(notification);
    }
    return unreadNotifications;
}

module.exports = notificationFilter;