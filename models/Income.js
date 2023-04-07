const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Income extends Model {}

Income.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    timestamps:false,
    freezeTableName: true,
    underscored: true,
    modelName: "income"
});

module.exports = Income;