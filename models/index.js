const User = require("./User")
const Income = require("./Income")
const Expense = require("./Expens")

User.hasMany(Income, {
    foreignKey: "userId",
    onDelete:"CASCADE",
});

User.hasMany(Expense, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Income.belongsTo(User, {
    foreignKey: "userId",
});

Expense.belongsTo(User, {
    foreignKey:"userId",
});

module.exports = { User, Income , Expense}