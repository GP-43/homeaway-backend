module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        email: {
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
        }
    });

    Users.associate = (models) => {
        Users.hasOne(models.Renters);
        Users.hasOne(models.Occupants);
    };

    Users.associate = (models) => {
        Users.hasMany(models.Bookings);
    };
    return Users;
};
