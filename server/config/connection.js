const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/budgetDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database!");
});

mongoose.connection.on("error", (err) => {
  console.error(`Failed to connect to database: ${err}`);
});

module.exports = mongoose.connection;