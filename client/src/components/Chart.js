import React from "react";
import { QUERY_ME } from "../utils/queries"
import { useQuery } from "@apollo/client";
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

function Chart({isLoggedInUser= false}) {

    const {loading, data } = useQuery(QUERY_ME)

    if (loading) {
      return <div> loading... </div>;
    }

    const incomes = data?.me?.incomes || [];
    const expenses = data?.me?.expenses || [];

    const lineGraphData = {
        labels:  incomes.map((income) => {
            const { date } = income
            return date;
        }),
        datasets: [
           { 
                label: "Income",
                data:[
                    ...incomes.map((income) => {
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
                    ...expenses.map((expense) => {
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
    }

    const circleGraphData = {
        labels:  expenses.map((expense) => {
            const { category } = expense
            return category;
        }),
        datasets: [
           { 
                label: "Expenses",
                data:[
                    ...expenses.map((expense) => {
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
    <div className="absolute w-auto left-1/2 transform -translate-x-1/2 sm:top-60 sm:left-96 lg:left-1/4 lg:ml-80">
        
    {isLoggedInUser ? (
        <>
        <Line 
            className="h-40"
            data= {lineGraphData}
            options={lineOptions} 
        />

        <Doughnut 
            className="h-40"
            data={circleGraphData}
            options={circleOptions} 
        />
        </>
    ):(
        <p className="flex justify-center items-center "> Please login to view your dashboard. </p>
    )}
    </div>
        
        )}
        


export default Chart;
