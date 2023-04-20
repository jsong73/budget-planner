const { User, Expense, Income } = require("./models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("./utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("expenses").populate("incomes");
    },
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
        const user = await User.findOne({ email: context.user.email }).populate(
          "expenses"
        );
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
    
    }
}