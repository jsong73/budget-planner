import React from "react";
import Form from "../components/Form"
import { useGlobalContext } from "../context/globalContext";


function Income() {
  const { addIncome , incomes, getIncomes } = useGlobalContext()


  return (
    <div className="flex justify-center items-center mt-12 ">
        <h1 className="font-bold text-3xl">Income</h1>
          <div>         
            <Form />
          </div>
 
    </div>
  )}


export default Income;
