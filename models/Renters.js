module.exports = (sequelize, DataTypes) => {
    const Renters = sequelize.define("Renters", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        properties: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }); 
    return Renters;
};