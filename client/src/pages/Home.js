import React , {useState} from "react";
import Chart from "../components/Chart"
import Auth from "../utils/auth"
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries"
import {warning} from "../utils/Icons"

function Home() {

  const [view, setView] = useState("yearly");
  const {loading, data } = useQuery(QUERY_ME)
  
  if (loading) {
    return <div> loading... </div>;
  }
  
//making sure please login msg is displayed when user is not logged in
  const isLoggedIn = Auth.loggedIn();
  
  if (!isLoggedIn) {
    return (
      <div>
        <div className="flex justify-center items-center text-center mt-12">
          <h1 className="font-bold text-3xl">Home</h1>
        </div>
        <div className="flex justify-center items-center text-center mt-52">
          <p className="mr-3">Please log in to view your dashboard</p>
          <div className="text-3xl">  {warning} </div>
        </div>
      </div>
    );
  }
  
  //grabbing income and expenses data
  const incomes = data?.me?.incomes || [];
  const expenses = data?.me?.expenses || [];

  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear().toString();

// Convert currentMonth to three-letter format (apr, may, jun)
const currentMonthShort = currentMonth.substr(0, 3);

// Filter incomes and expenses based on the selected view
let filteredIncomes, filteredExpenses;
if (view === "monthly") {
  filteredIncomes = incomes.filter((income) => {
    // Extract the month and year from the date string
    const [incomeMonth] = income.date.match(/[A-Za-z]+/);
    const incomeYear = income.date.match(/\d{4}/)[0];
    return incomeMonth === currentMonthShort && incomeYear === currentYear;
  });

  filteredExpenses = expenses.filter((expense) => {
    // Extract the month and year from the date string
    const [expenseMonth] = expense.date.match(/[A-Za-z]+/);
    const expenseYear = expense.date.match(/\d{4}/)[0];
    return expenseMonth === currentMonthShort && expenseYear === currentYear;
  });
} else {
  filteredIncomes = incomes.filter((income) =>
    income.date.endsWith(currentYear.toString())
  );
  filteredExpenses = expenses.filter((expense) =>
    expense.date.endsWith(currentYear.toString())
  );
}

  const totalIncome = filteredIncomes.reduce(
    (total, income) => total + Number(income.amount),
    0
  );
  const totalExpense = filteredExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const remainingBalance = totalIncome - totalExpense;

  //toggle month vs year dashboard
  const handleToggle = () => {
    setView((prevView) => (prevView === "monthly" ? "yearly" : "monthly"));
  };


  return (
    <div>
        <div className="flex justify-center items-center mt-12">
            <h1 className="font-bold text-3xl">Home</h1>
        </div>

        <Chart 
          isLoggedInUser = {Auth.loggedIn() === true}
          filteredIncomes={filteredIncomes}
          filteredExpenses={filteredExpenses}
        />
 
            <div className="flex flex-col justify-center items-center text-center mt-12 sm:flex-row sm:justify-center sm:items-center">
              
              <div className="lg:mr-52">
                <h1> Total Income this {view === "monthly" ? "Month" : "Year"}</h1>
                  <hr className="w-54 my-2 border-gray-300 border-t" />
                    <div className="font-bold">${totalIncome.toFixed(2)}</div>
              </div>
          

              <div className="lg:mr-48">
                <h1> Total Expense this {view === "monthly" ? "Month" : "Year"} </h1>
                  <hr className="w-54 my-2 border-gray-300 border-t" />
                    <div className="font-bold">${totalExpense.toFixed(2)}</div>
              </div>


              <div>
                <h1> Remaining Balance this {view === "monthly" ? "Month" : "Year"} </h1>
                  <hr className="w-76 my-2 border-gray-300 border-t" />
                    <div className="font-bold">${remainingBalance.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-14">
                <button 
                  onClick={handleToggle}
                  className="w-80 mb-4 bg-zinc-800 rounded-xl border-solid border"> 
                   View {view === "monthly" ? "Yearly" : "Monthly"} Dashboard
                </button>
            </div>
    </div>
  )}


export default Home;
