import React from "react";
import { QUERY_ME } from "../utils/queries"
import { useQuery } from "@apollo/client";
import {warning} from "../utils/Icons"
import { Chart as ChartJs , 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, 
    ArcElement } from "chart.js"
import { Line , Doughnut} from "react-chartjs-2"

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, 
    ArcElement
);

function Chart({isLoggedInUser= false, filteredIncomes, filteredExpenses}) {

// current year 
const currentYear = new Date().getFullYear().toString();

// filter incomes based on the current year
const filteredIncomesByYear = filteredIncomes.filter(income => {
const incomeYear = income.date.substring(income.date.lastIndexOf(' ') + 1);
    return incomeYear === currentYear;
  });

// filter expenses based on the current year
const filteredExpensesByYear = filteredExpenses.filter(expense => {
const expenseYear = expense.date.substring(expense.date.lastIndexOf(' ') + 1);
    return expenseYear === currentYear;
    });

//add category amounts
const categoryAmounts = filteredExpensesByYear.reduce((amounts, expense) => {
const { category, amount } = expense;
if (amounts[category]) {
    amounts[category] += Number(amount);
} else {
    amounts[category] = Number(amount);
}
  return amounts;
}, {});

// Obtain unique categories and summed amounts
const uniqueCategories = Object.keys(categoryAmounts);
const summedAmounts = Object.values(categoryAmounts);

const {loading } = useQuery(QUERY_ME)

if (loading) {
return <div> loading... </div>;
}

// const incomes = data?.me?.incomes || [];
// const expenses = data?.me?.expenses || [];

const lineGraphData = {
    labels: filteredIncomesByYear.map(income => income.date),
    datasets: [
      {
        label: "Income",
        data: filteredIncomesByYear.map(income => income.amount),
        backgroundColor: "#2eb96a",
        borderColor: "#2eb96a",
        borderWidth: 1,
        tension: 0.2
      },
      {
        label: "Expenses",
        data: filteredExpensesByYear.map(expense => expense.amount),
        backgroundColor: "#eb3b5b",
        borderColor: "#eb3b5b",
        borderWidth: 1,
        tension: 0.2
      }
    ]
  };

const lineOptions = {
        scales: {
            y: {
                ticks: {
                    color: "#EDEADE"
                }
            },
            x: {
                ticks: {
                    color: "#EDEADE"
                }
            }
        }
    };



const circleGraphData = {
  labels: uniqueCategories,
  datasets: [
    {
      label: "Expenses",
      data: summedAmounts,
      backgroundColor: [
        '#f39f3e',
        '#4e7be0',
        '#2eb96a',
        '#eb3b5b',
        '#9c589c',
        '#2C6454',
        '#E8DD68',
        '#005AFF',
        '#6B37C4',
        '#FC8585',
        '#374473',
      ],
      borderWidth: 1,
    },
  ],
};

const circleOptions = {
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#EDEADE',
      },
    },
  },
};
    
  return (
    <div className={`chart-container ${isLoggedInUser ? '' : 'text-center'}`}>
        
    {isLoggedInUser ? (
        <>
        <div className="line-graph">
            <Line 
                data= {lineGraphData}
                options={lineOptions} 
            />
        </div>

         <div className="circle-graph">
            <Doughnut 
                data={circleGraphData}
                options={circleOptions} 
            />
        </div>
        </>
    ):(
        <div className="mx-auto text-center mt-10"> 
            <p className="mr-3"> Please login to view your dashboard
             </p> 
             <div className="text-3xl">  {warning} </div>
        </div>
    )}
    </div>
)}
        


export default Chart;
