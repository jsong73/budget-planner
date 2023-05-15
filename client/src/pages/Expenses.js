import { useQuery } from "@apollo/client";
import React , { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import ExpenseForm from "../components/ExpenseForm"
import DateFilter from "../components/DateFilter"
import ExpenseDetails from "../components/ExpenseDetails"

function Expenses() {

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const {loading, data}= useQuery(QUERY_ME);

  if (loading) {
    return <div> loading... </div>;
  }

  const expenses = data?.me?.expenses || [];
  // console.log(expenses)

  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear().toString();

  // filtering incomes based on selected month and year
  //used .substring (0,3) since my months return shortened
  const filteredExpenses = selectedMonth && typeof selectedMonth === 'string' 
  ? selectedYear
  ? expenses.filter(expense => {
      const shortenedMonth = selectedMonth.substring(0, 3).toLowerCase();
      const year = selectedYear.toString();
      return (
        expense.date &&
        expense.date.toLowerCase().startsWith(shortenedMonth) &&
        expense.date.endsWith(year)
      );
    })
    //filter incomes based on current month and year if no month is selected but a year is selected
    : expenses.filter(expense => {
      const shortenedMonth = selectedMonth.substring(0, 3).toLowerCase();
      const year = currentYear;
      return (
        expense.date &&
        expense.date.toLowerCase().startsWith(shortenedMonth) &&
        expense.date.endsWith(year)
      );
    })
    //if no year or month selected, return current year and months incomes
    : expenses.filter(expense => {
    const expenseMonth = expense.date.substring(0, expense.date.indexOf(' '));
    const expenseYear = expense.date.substring(expense.date.lastIndexOf(' ') + 1);
    return expenseMonth === currentMonth && expenseYear === currentYear;
  });

  //adds up all the income amounts
  const totalExpense = filteredExpenses.reduce((total, expense) => {
  return total + Number(expense.amount);
  }, 0)

  return (
    <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="font-bold text-3xl mb-12">Expenses</h1>
    

      <div className="w-full lg:max-w-lg">
          <ExpenseForm />
      </div>

      <DateFilter 
        onYearSelect={setSelectedYear}
        onMonthSelect={setSelectedMonth} 
      />

      <div className="w-full lg:max-w-4xl mt-9">
            {filteredExpenses.map((expense) => (
              <ExpenseDetails
                  key={expense._id}
                  id={expense._id}
                  title={expense.title}
                  amount={expense.amount}
                  date={expense.date}
                  category={expense.category}
                  description={expense.description}
                />
        ))}
            </div>       

    <div className="w-full max-w-lg border-t border-gray-300 pt-4 mt-36 fixed bottom-20">
        <h2 className="font-bold text-2xl text-center text-red-800">Total Expenses: -${totalExpense.toFixed(2)}</h2>
    </div>

</div>
)}


export default Expenses;
