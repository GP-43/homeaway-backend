module.exports = (sequelize, DataTypes) => {
    const Bookings = sequelize.define("Bookings", {
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
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
        //canceled 0 or success 1
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Bookings;
};