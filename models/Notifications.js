module.exports = (sequelize, DataTypes) => {
    const Notifications = sequelize.define("Notifications", {
        notification_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        //view da nadda
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complaint_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Notifications;
};