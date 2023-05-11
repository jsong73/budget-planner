import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

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

  const topFiveTransactions = recentTransactions.slice(0,5);
  console.log(topFiveTransactions)

  return (
    <div>
      <div className="flex justify-center items-center mt-12">
          <h1 className="font-bold text-3xl">Transactions</h1>
      </div>

    <div className="mt-20 justify-center items-center text-center"> Recent Transaction History
    <ul className="mt-4">
          {topFiveTransactions.map((transaction, index) => (
            <li 
              className=""
              key={index}>
                <p>{transaction.title}</p>
                <p>
                  {transaction.__typename === "Income" && <span style={{ color: "green" }}>+</span>}
                  {transaction.__typename === "Expense" && <span style={{ color: "red" }}>-</span>}
                  {transaction.amount}
                </p>  
            </li>
          ))}
        </ul>
   
        </div>
    
    </div>
)}


export default Transactions;
