import IncomeForm from "../components/IncomeForm"
import IncomeDetails from "../components/IncomeDetails"


function Income(incomes) {

  return (
    <div className="flex justify-center items-center mt-12 ">
        <h1 className="font-bold text-3xl">Income</h1>
          <div>         
            <IncomeForm />

            {incomes.map((income) => {
              const {_id, title, amount, date, category, description} = income;
              return <IncomeDetails
              key={_id}
              id={_id}
              title={title}
              amount={amount}
              date={date}
              category={category}
              description={description}
              />
            })}
          </div>
 
    </div>
  )}


export default Income;
