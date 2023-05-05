import { useQuery } from "@apollo/client";
import React from "react";
import { QUERY_ME } from "../utils/queries";

function Expenses() {

  const {loading, data}= useQuery(QUERY_ME);

  const expenses = data?.me?.expenses || []


  return (
    <div className="flex justify-center items-center mt-12">
        <h1 className="font-bold text-3xl">Expenses</h1>
    </div>
  )}


export default Expenses;
