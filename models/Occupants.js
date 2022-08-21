module.exports = (sequelize, DataTypes) => {
    const Occupants = sequelize.define("Occupants", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Occupants;
};