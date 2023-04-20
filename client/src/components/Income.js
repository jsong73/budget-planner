import React, { useEffect } from "react";
import Form from "../components/Form"
import { useGlobalContext } from "../context/globalContext";
import IncomeDetails from "./IncomeDetails";

function Income() {
  const { addIncome , incomes } = useGlobalContext();

  // useEffect(() => {
  //   getIncomes();
  // }, [])


  return (
    <div className="flex justify-center items-center mt-12 ">
        <h1 className="font-bold text-3xl">Income</h1>
          <div>         
            <Form />

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
