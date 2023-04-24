const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat")

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
        get: (timestamp) => dateFormat(timestamp),
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
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
