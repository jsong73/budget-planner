import IncomeForm from "../components/IncomeForm"
import IncomeDetails from "../components/IncomeDetails"
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries"
import MonthFilter from "../components/MonthFilter";
import { useState } from "react";


function Income() {

  const [selectedMonth, setSelectedMonth] = useState(null);
  const {loading, data } = useQuery(QUERY_ME)

  if (loading) {
    return <div> loading... </div>;
}

  const incomes = data?.me?.incomes || [];
  // console.log(incomes)

  // filtering incomes based on selected month
  //used .substring (0,3) since my months return shortened
  //selected month August will display income data that starts with Aug
  const filteredIncomes = selectedMonth && typeof selectedMonth === 'string'
  ? incomes.filter(income => {
      const shortenedMonth = selectedMonth.substring(0, 3).toLowerCase();
      return income.date && income.date.toLowerCase().startsWith(shortenedMonth)
    })
  : incomes;
  console.log(selectedMonth)

  //adds up all the income amounts
  const totalIncome = filteredIncomes.reduce((total, income) => {
    return total + Number(income.amount);
  }, 0)
  // console.log(totalIncome)

  return (
    <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="font-bold text-3xl mb-12">Income</h1>

            <div className="w-full lg:max-w-lg">
              <IncomeForm />
            </div>

            <MonthFilter onMonthSelect={setSelectedMonth} />

            <div className="w-full lg:max-w-4xl mt-6">
            {filteredIncomes.map((income) => (
              <IncomeDetails
                  key={income._id}
                  title={income.title}
                  amount={income.amount}
                  date={income.date}
                  description={income.description}
                />
        ))}
            </div>          
         
          <div className="w-full max-w-lg border-t border-gray-300 pt-4 mt-36 fixed bottom-20">
              <h2 className="font-bold text-2xl text-center">Total income: ${totalIncome.toFixed(2)}</h2>
          </div>
       
    </div>
  )}


export default Income;
