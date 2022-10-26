module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define("Transactions", {
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        rent_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        occupant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        //canceled 0 or success 1
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        profit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Transactions;
};