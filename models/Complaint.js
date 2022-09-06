module.exports = (sequelize, DataTypes) => {
    const Complaint = sequelize.define("Complaint", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        compliner_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
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
    return Complaint;
};