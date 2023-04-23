import IncomeForm from "../components/IncomeForm"
import IncomeDetails from "../components/IncomeDetails"
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries"


function Income() {

  const {loading, data} = useQuery(QUERY_ME)
  
  console.log("loading:", loading);
  console.log("data:", data);


  if (loading) {
    return <div> loading... </div>;
}

  const incomes = data?.me?.income || [];
  console.log(incomes)

  return (
    <div className="flex justify-center items-center mt-12 ">
        <h1 className="font-bold text-3xl">Income</h1>
          <div>         
            <IncomeForm />
{/* 
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
            })} */}
          </div>
 
    </div>
  )}


export default Income;
