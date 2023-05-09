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
import { Line } from "react-chartjs-2"

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

function Chart() {

    const {loading, data } = useQuery(QUERY_ME)

    if (loading) {
      return <div> loading... </div>;
    }

    const incomes = data?.me?.incomes || [];
    const expenses = data?.me?.expenses || [];

    const graphData = {
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
                backgroundColor: "green",
                borderColor: "white",
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
                backgroundColor: "red",
                borderColor: "white",
                borderWidth: 1,
                tension: .2
            },
        ]
    }

    const options = {
        scales: {
            y: {
                ticks: {
                    color: 'white'
                }
            },
            x: {
                ticks: {
                    color: 'white'
                }
            }
        }
    }
  return (
    <div className="absolute w-auto left-1/2 transform -translate-x-1/2 sm:top-60 sm:left-96 lg:left-1/4 lg:ml-80">
        <Line 
            className="w-full h-96"
            data= {graphData}
            options={options} />
    </div>
  )}


export default Chart;
