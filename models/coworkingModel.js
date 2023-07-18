module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        price: DataTypes.JSON,
        superficy: DataTypes.INTEGER,
        capacity: DataTypes.INTEGER,
        address: DataTypes.JSON
    });
}
