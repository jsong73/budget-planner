const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = function (email) {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validateEmail, "Please fill a valid email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    expenses: [
        {
          type: Schema.Types.ObjectId,
          ref: "Expense",
        },
      ],
      incomes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Income",
        },
      ],
  },
  {
    toJSON: {
      // used for formatting and combining fields and de-composing a single value into multiple values before storing it in the collection.
      virtuals: true,
    },
    id: false,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
