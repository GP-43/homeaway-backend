module.exports = (sequelize, DataTypes) => {
    const Places = sequelize.define("Places", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        priceType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roomCategory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postalCode: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wifi: {
            type: DataTypes.BOOLEAN,
        },
        parking: {
            type: DataTypes.BOOLEAN,
        },
        ac: {
            type: DataTypes.BOOLEAN,
        },
        silent: {
            type: DataTypes.BOOLEAN,
        },
        food: {
            type: DataTypes.BOOLEAN,
        },
        washroom: {
            type: DataTypes.BOOLEAN,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    return Places;
}; 