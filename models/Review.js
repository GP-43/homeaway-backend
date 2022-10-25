module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        placeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        occupantId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    return Review;
};

