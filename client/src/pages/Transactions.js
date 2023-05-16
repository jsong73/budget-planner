import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { saveAs } from 'file-saver';
import * as XLSX from "xlsx";
import Auth from "../utils/auth"
import {error} from "../utils/Icons"

function Transactions() {

  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div> loading... </div>;
  }

  //making sure please login msg is displayed when user is not logged in
  const isLoggedIn = Auth.loggedIn();
  
  if (!isLoggedIn) {
    return (
      <div>
        <div className="flex justify-center items-center text-center mt-12">
          <h1 className="font-bold text-3xl">Transactions</h1>
        </div>
        <div className="flex justify-center items-center text-center mt-52">
          <p className="mr-3">Please log in to view your transactions </p>
          <div className="text-3xl"> {error} </div>
        </div>
      </div>
    );
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

//shows only first 7 transactions
const topFiveTransactions = recentTransactions.slice(0,7);
// console.log(topFiveTransactions)

// Create separate sheets for each month 
const sheets = {};
recentTransactions.forEach((transaction) => {
  const date = parseDate(transaction.date);
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);
  let sheetName = `${month}/${year}`;

  // Replace invalid characters in the sheet name
  sheetName = sheetName.replace(/[\\/:?*[\]]/g, "_");

  if (!sheets[sheetName]) {
    sheets[sheetName] = []; 
  }
  sheets[sheetName].push([
    transaction.title,
    transaction.__typename === "Income" ? "Income" : "Expense",
    transaction.amount,
    transaction.date,
  ]);
});

// Calculate total income for a specific month
const calculateTotalIncome = (transactions) => {
  const totalIncome = transactions.reduce((sum, transaction) => {
    if (transaction[1] === "Income") {
      return sum + parseFloat(transaction[2]);
    }
    return sum;
  }, 0);
  return totalIncome;
};

// Calculate total expenses for a specific month
const calculateTotalExpenses = (transactions) => {
  const totalExpenses = transactions.reduce((sum, transaction) => {
    if (transaction[1] === "Expense") {
      return sum + parseFloat(transaction[2]);
    }
    return sum;
  }, 0);
  return totalExpenses;
};

const workbook = XLSX.utils.book_new();
Object.entries(sheets).forEach(([sheetName, transactions]) => {

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const remainingBalance = totalIncome - totalExpenses;

  // Add summary information at the end of the transactions array
  transactions.push(
    ['', "Total Income:", totalIncome],
    ['', "Total Expenses:", totalExpenses],
    ['', "Remaining Balance:", remainingBalance]
  );

  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["Title", "Type", "Amount", "Date"],
    ...transactions,
    ]);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

// Download the excel file
  const downloadExcelFile = () => {
  const xlsxFile = XLSX.write(workbook, { type: "binary" });
  const fileBuffer = new ArrayBuffer(xlsxFile.length);
  const fileView = new Uint8Array(fileBuffer);
  for (let i = 0; i < xlsxFile.length; i++) {
    fileView[i] = xlsxFile.charCodeAt(i) & 0xff;
  }
  const blob = new Blob([fileBuffer], { type: "application/octet-stream" });
  saveAs(blob, "transaction_report.xlsx");
};

 
  return (
    <div>
      <div className="flex justify-center items-center mt-12">
          <h1 className="font-bold text-3xl">Transactions</h1>
      </div>

    <div className="flex flex-col mt-12 justify-center items-center text-center"> Recent Transaction History
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

        <button 
          className="mt-8 bg-zinc-800 rounded-xl flex px-10 py-1 border-solid border focus:bg-zinc-600"
          onClick={downloadExcelFile}> Download Transaction Report </button>
        </div>
        
    </div>
)}


export default Transactions;
