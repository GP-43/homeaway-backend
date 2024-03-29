module.exports = (sequelize, DataTypes) => {
    const Occupants = sequelize.define("Occupants", {
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
        joinedDate: {
            type: DataTypes.DATE,
            allowNull: true,
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
    return Occupants;
};