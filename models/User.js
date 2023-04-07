const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, "Password must be at least 5 characters!"]
        }
    }
},{
    sequelize,
    timestamps:false,
    freezeTableName: true,
    underscored: true,
    modelName: "user"
});

module.exports = User;