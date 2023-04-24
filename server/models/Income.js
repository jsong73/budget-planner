const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

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
        get: (timestamp) => dateFormat(timestamp),
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
