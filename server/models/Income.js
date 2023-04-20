const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
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
        enum: ["Paycheck 1", "Paycheck 2", "Paycheck 3", "Paycheck 4"],
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

module.exports = mongoose.model("Income", IncomeSchema);
