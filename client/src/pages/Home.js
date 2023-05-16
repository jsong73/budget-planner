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

  // Filter incomes and expenses based on the selected view
  let filteredIncomes, filteredExpenses;
  if (view === "monthly") {
    filteredIncomes = incomes.filter((income) => {
      // Extract the month name from the date string
      const incomeMonth = income.date.substr(0, income.date.indexOf(' ')); 
      // Extract the last four characters of the date string as the year
      const incomeYear = income.date.substr(-4); 
      return incomeMonth === currentMonth && incomeYear === currentYear;
    });
    // console.log(filteredIncomes);
    filteredExpenses = expenses.filter((expense) => {
      const expenseMonth = expense.date.substr(0, expense.date.indexOf(' ')); 
      const expenseYear = expense.date.substr(-4);
      return expenseMonth === currentMonth && expenseYear === currentYear;
    });
    // console.log(filteredExpenses);
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
 
            <div className="flex justify-center items-center text-center mt-12">
              
              <div className="mr-52">
                <h1> Total Income this {view === "monthly" ? "Month" : "Year"}</h1>
                  <hr className="w-54 my-2 border-gray-300 border-t" />
                    <div className="font-bold">${totalIncome.toFixed(2)}</div>
              </div>
          

              <div className="mr-48">
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

            <div className="flex justify-center items-center mt-20">
                <button 
                  onClick={handleToggle}
                  className="w-80 mb-4 bg-zinc-800 rounded-xl border-solid border"> 
                   View {view === "monthly" ? "Yearly" : "Monthly"} Dashboard
                </button>
            </div>
    </div>
  )}


export default Home;
