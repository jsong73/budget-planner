const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        maxLength: 20
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ["House", "Entertainment", "Subscriptions", "Pets", "Transportation", "Insurance", 
        "Personal Care", "Loans", "Savings", "Investments", "Gifts", "Cellphone", "Vacation", 
         "Other"],
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
}, 
    {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false,
    timestamps: true
    }
)

module.exports = mongoose.model("Expense", ExpenseSchema);
