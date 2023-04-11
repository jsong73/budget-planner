const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense= async(req, res) => {
    const {title, amount, description, date, category} = req.body

    const income = ExpenseSchema({
        title,
        amount,
        description,
        category,
        date
    })
    //validations
    try{
        if(!title || !date || !category ){
        return res.status(400).json({ msg: "Please fill in the required fields."})
    } 
        if(amount  <=  0 || !amount === "number"){
        return res.status(400).json({ msg: "Paycheck must be a positive number."})
    }
        await income.save()
        res.status(200).json({ msg: "Expense has been added."})
    } catch(err){
        console.log(err);
        res.status(500).json({ msg: "500 Server Error"})
    }
    console.log(income)
}

exports.getExpenses = async(req, res) => {
    try{
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "500 Server Error"})
    }
}

exports.deleteExpense = async(req, res) => {
  const { id } = req.params;
  console.log(req.params)
  console.log(id)
  ExpenseSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({ msg: "Expense was successfully deleted."})
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({msg: "500 Server Error"})
    })
}
