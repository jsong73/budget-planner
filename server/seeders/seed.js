const db = require("../config/connection");
const { User, Income, Expense } = require("../models");
const userSeeds = require("./userSeeds.json");
const incomeSeeds = require("./incomeSeeds.json");
const expenseSeeds = require("./expenseSeeds.json");

db.once("open", async () => {
  try {
    await Expense.deleteMany({});
    await Income.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < expenseSeeds.length; i++) {
      const { _id } = await Expense.create(expenseSeeds[i]);
      const user = await User.findOneAndUpdate(
        { _id: expenseSeeds[i].user },
        { $push: { expenses: _id } },
        { new: true }
      );
    }

    for (let i = 0; i < incomeSeeds.length; i++) {
      const { _id } = await Income.create(incomeSeeds[i]);
      const user = await User.findOneAndUpdate(
        { _id: incomeSeeds[i].user },
        { $push: { income: _id } },
        { new: true }
      );
    }

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});