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

    const {loading } = useQuery(QUERY_ME)

    if (loading) {
      return <div> loading... </div>;
    }

    // const incomes = data?.me?.incomes || [];
    // const expenses = data?.me?.expenses || [];

    const lineGraphData = {
        labels:  filteredIncomes.map((income) => {
            const { date } = income
            return date;
        }),
        datasets: [
           { 
                label: "Income",
                data:[
                    ...filteredIncomes.map((income) => {
                        const { amount } = income
                        return amount;
                    })
                ],
                backgroundColor: "#2eb96a",
                borderColor: "#2eb96a",
                borderWidth: 1,
                tension: .2
            },
            { 
                label: "Expenses",
                data:[
                    ...filteredExpenses.map((expense) => {
                        const { amount } = expense
                        return amount;
                    })
                ],
                backgroundColor: "#eb3b5b",
                borderColor: "#eb3b5b",
                borderWidth: 1,
                tension: .2
            },
        ]
    }

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
        labels:  filteredExpenses.map((expense) => {
            const { category } = expense
            return category;
        }),
        datasets: [
           { 
                label: "Expenses",
                data:[
                    ...filteredExpenses.map((expense) => {
                        const { amount } = expense
                        return amount;
                    })
                ],
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
                    '#374473'

                ],
                borderWidth: 1,
            },
        ]
    }

    const circleOptions = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#EDEADE'
                }
            }
        }
    }
    
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
