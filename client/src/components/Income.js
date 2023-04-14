import React from "react";
import { useGlobalContext } from "../context/globalContext";

function Income() {
  const { addIncome } = useGlobalContext()
  return (
    <div className="container">
        <h1>Income</h1>
    </div>
  )}


export default Income;
