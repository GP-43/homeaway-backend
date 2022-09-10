module.exports = (sequelize, DataTypes) => {
    const Places = sequelize.define("RatingFeedback", {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rateplace: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        placefeedback: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rateowner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ownerfeedback: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aboutsystem: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return RatingFeedback;
};