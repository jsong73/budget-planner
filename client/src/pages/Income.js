import IncomeForm from "../components/IncomeForm"
import IncomeDetails from "../components/IncomeDetails"
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries"

function Income() {

  const {loading, data, error} = useQuery(QUERY_ME)

  if (loading) {
    return <div> loading... </div>;
}

  const incomes = data?.me?.incomes || [];
  // console.log(incomes)

  //adds up all the income amounts
  const totalIncome = incomes.reduce((total, income) => {
    return total + Number(income.amount);
  }, 0)
  // console.log(totalIncome)

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-12 ">
        <h1 className="font-bold text-3xl">Income</h1>
          <div className="w-full max-w-lg mt-6">  
            <IncomeForm />
            </div>
            
            <div className="w-full max-w-lg mt-6">
            {incomes.map((income) => {
              const {_id, title, amount, date, description} = income;
              return <IncomeDetails
              key={_id}
              id={_id}
              title={title}
              amount={amount}
              date={date}
              description={description}
              />
            })}
          </div>
          
          <div className="w-full max-w-lg mt-auto border-t border-gray-300 pt-4">
              <h2 className="font-bold text-2xl text-center">Total income: ${totalIncome.toFixed(2)}</h2>
          </div>
    </div>
  )}


export default Income;
