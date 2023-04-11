const router = require("express").Router();
const { addExpense, getExpenses, deleteExpense } = require("../controllers/expensesControllers.js");
const { addIncome, getIncomes, deleteIncome } = require("../controllers/incomeControllers.js")


router.post("/add-income", addIncome)
        .get("/get-incomes", getIncomes)
        .delete("/delete-income/:id", deleteIncome)
        .post("/add-expense", addExpense)
        .get("/get-expenses", getExpenses)
        .delete("/delete-expense/:id", deleteExpense)

module.exports = router;