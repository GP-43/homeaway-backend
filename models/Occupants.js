module.exports = (sequelize, DataTypes) => {
    const Occupants = sequelize.define("Occupants", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
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
            allowNull: false,
        },
        properties: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }); 
    return Occupants;
};