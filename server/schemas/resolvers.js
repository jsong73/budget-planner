const { User, Expense, Income } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
Query: {
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate("expenses").populate("incomes");
    },
    expenses: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Expense.find(params).sort({ date: -1 });
    },
    expense: async (parent, { expenseId }) => {
      return Expense.findById(expenseId);
    },
    incomes: async (parent, { email }) => {
      const params = email ? { email } : {};
      return Income.find(params).sort({ date: -1 });
    },
    income: async (parent, { incomeId }) => {
      return Income.findById(incomeId);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ email: context.user.email })
        .populate("incomes")
        .populate("expenses");
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },


Mutation:{
    addUser: async (parent, {email, password}) => {
        const user = await User.create({email, password});
        const token = signToken(user);
        return {token, user}
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        
        if (!user) {
          throw new AuthenticationError("No user found with this email!");
        }
  
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials!");
        }
        const token = signToken(user);
        return { token, user };
      },
    addExpense: async (parent,{ title, amount, date, category, description }, context) => {
        if (context.user) {
          const expense = await Expense.create({
            title,
            amount,
            date,
            category,
            description,
            user: context.user._id,
          });
          await User.findByIdAndUpdate(context.user._id, {
            $push: { expenses: expense._id },
          });
          return expense;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    addIncome: async (parent,{ title, amount, date, description }, context) => {
        if (context.user) {
          const income = await Income.create({
            title,
            amount,
            date,
            description,
            user: context.user._id,
          });
          await User.findByIdAndUpdate(context.user._id, {
            $push: { incomes: income._id },
          });
          return income;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    removeExpense: async (parent, { expenseId }, context) => {
        if (context.user) {
          await Expense.findByIdAndDelete(expenseId);
          await User.findByIdAndUpdate(context.user._id, {
            $pull: { expenses: expenseId },
          });
          return true;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    removeIncome: async (parent, { incomeId }, context) => {
        if (context.user) {
          await Income.findByIdAndDelete(incomeId);
          await User.findByIdAndUpdate(context.user._id, {
            $pull: { income: incomeId },
          });
          return incomeId;
        }
        throw new AuthenticationError("You need to be logged in!");
      },
    
    }
}


module.exports = resolvers;