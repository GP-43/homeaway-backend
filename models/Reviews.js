module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        review_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        reviewer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        renter_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Reviews;
};