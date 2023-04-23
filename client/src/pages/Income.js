import Form from "../components/Form"


function Income() {

  // useEffect(() => {
  //   getIncomes();
  // }, [])


  return (
    <div className="flex justify-center items-center mt-12 ">
        <h1 className="font-bold text-3xl">Income</h1>
          <div>         
            <Form />

            {/* {incomes.map((income) => {
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
            })} */}
          </div>
 
    </div>
  )}


export default Income;
