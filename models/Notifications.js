module.exports = (sequelize, DataTypes) => {
    const Notifications = sequelize.define("Notifications", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        compliner_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },     
        complainee_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },       
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }); 
    return Notifications;
};