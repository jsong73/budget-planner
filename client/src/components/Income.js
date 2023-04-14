import React from "react";
import Form from "../components/Form"
import { useGlobalContext } from "../context/globalContext";


function Income() {
  const { addIncome } = useGlobalContext()


  return (
    <div className="container form">
        <h1>Income</h1>
          <Form />
    </div>
  )}


export default Income;
