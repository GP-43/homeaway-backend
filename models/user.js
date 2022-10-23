module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        user_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //occupant 1 admin 0
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        joinedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        //delete 0 active 1
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return User;
};