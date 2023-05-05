import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_ME } from "../utils/queries";
import ExpenseForm from "../components/ExpenseForm"

function Expenses() {

  const {loading, data}= useQuery(QUERY_ME);

  const expenses = data?.me?.expenses || [];
  console.log(expenses)


  return (
    <div className="flex justify-center items-center mt-12">
        <h1 className="font-bold text-3xl mb-12">Expenses</h1>
    

      <div className="w-full lg:max-w-lg">
          <ExpenseForm />
      </div>



</div>
)}


export default Expenses;
