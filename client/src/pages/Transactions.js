import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { saveAs } from 'file-saver';

function Transactions() {

  const { loading, data } = useQuery(QUERY_ME);


  if (loading) {
    return <div> loading... </div>;
  }

  const incomes = data?.me?.incomes || [];
  const expenses = data?.me?.expenses || [];

  //combinging my incomes and expenses array
  const allTransactions = [...incomes,...expenses]

 // Helper function to convert date strings to date objects
 const parseDate = (dateString) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const [, month, day, year] = dateString.match(/(\w+) (\d+)(?:st|nd|rd|th), (\d+)/);
  const monthIndex = months.findIndex((m) => m === month);
  return new Date(year, monthIndex, day);
};

// Sorting all transactions based on descending date order
const recentTransactions = allTransactions.sort((a, b) => {
  const dateA = parseDate(a.date);
  const dateB = parseDate(b.date);
  return dateB.getTime() - dateA.getTime();
});

  const topFiveTransactions = recentTransactions.slice(0,7);
  // console.log(topFiveTransactions)
  
  //file save as CSV
  const downloadCSV = () => {
    const csvData = [
      ["Title", "Type", "Amount", "Date", "Year"],
      ...recentTransactions.map((transaction) => [
        transaction.title,
        transaction.__typename === 'Income' ? 'Income' : 'Expense',
        transaction.amount,
        transaction.date,
      ]),
      ['', "Total Income:", calculateTotalIncome()],
      ['', "Total Expenses:", calculateTotalExpenses()],
      ['', "Remaining Balance:", calculateRemainingBalance()],
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'transaction_report.csv');
  };

  //income total calculations
  const calculateTotalIncome = () => {
    const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount), 0);
    return totalIncome.toFixed(2);
  };
// expense total calculations
  const calculateTotalExpenses = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    return totalExpenses.toFixed(2);
  };
//calculation for remaining balance
  const calculateRemainingBalance = () => {
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    const remainingBalance = totalIncome - totalExpenses;
    return remainingBalance.toFixed(2);
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-12">
          <h1 className="font-bold text-3xl">Transactions</h1>
      </div>

    <div className="mt-12 justify-center items-center text-center"> Recent Transaction History
    <ul className="mt-4">
          {topFiveTransactions.map((transaction, index) => (
            <li 
              className="border border-white rounded-lg p-4 mb-4 flex w-4/5 float-right mr-12"
              key={index}>
                <p className="flex-grow text-left">
                  {transaction.__typename === "Income" && <span style={{ color: "#2eb96a" }}>{transaction.title} </span>}
                  {transaction.__typename === "Expense" && <span style={{ color: "#eb3b5b" }}>{transaction.title} </span>}
                </p>
                <p className="flex-shrink-0 text-right"> 
                  {transaction.__typename === "Income" && <span style={{ color: "#2eb96a" }}> + </span>}
                  {transaction.__typename === "Expense" && <span style={{ color: "#eb3b5b" }}> - </span>}
                  {transaction.amount}
                </p>  
            </li>
          ))}
        </ul>

        <button onClick={downloadCSV}> Download Report </button>
        </div>
        
    </div>
)}


export default Transactions;
