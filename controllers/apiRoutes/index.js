const router = rquire("express").Router();
const userRoutes = require("./userRoutes");
const incomeRoutes = require("./incomeRoutes");
const expenseRoutes = require("./expenseRoutes");

router.use("/user", userRoutes);
router.use("/income", incomeRoutes);
router.use("/expenses", expenseRoutes);