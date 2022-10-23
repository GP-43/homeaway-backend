module.exports = (sequelize, DataTypes) => {
    const Payments = sequelize.define("Payments", {
        payment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        renter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        place_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //paid status 1 pending status 0
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Payments;
};