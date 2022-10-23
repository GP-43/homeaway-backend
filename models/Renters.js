module.exports = (sequelize, DataTypes) => {
    const Renters = sequelize.define("Renters", {
        renter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bank_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        branch_name: {
            type: DataTypes.STRING,
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
    return Renters;
};