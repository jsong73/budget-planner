import React, {useState}from "react";
import { money , calender , detail , profit, deleteBtn } from "../utils/Icons"
import { REMOVE_INCOME } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";

function IncomeDetails({
    title,
    amount,
    date, 
    id,
    description
}) {
// console.log(title)
// console.log(amount)
// console.log(id)
// console.log(date)
// console.log(description)


const [ removeIncome ] = useMutation(REMOVE_INCOME, {
  update(cache, {data: {removeIncome}}) {
    try{
      cache.readQuery({
        query: QUERY_ME,
        data: {me: removeIncome },
      });
    } catch (error) {
      console.log(error)
    }
  },
});


const removeIncomeHandler = async ( incomeId ) => {
  try{
    const { data } = await removeIncome({
      variables: { incomeId },
    });
    console.log(data)
    window.location.reload();
  } catch (error) {
    console.log(error)
  }
};

  return (

  <div className="flex w-full h-32 ml-80 sm:right-60">
    <div className="border border-white rounded-lg p-4 mb-4 flex w-full">

      <div className="flex items-center">
        {profit}
          <h1 className="font-bold text-xl ml-1 mr-2"> {title} </h1>
      </div>


      <div className="flex items-center">
        {money}
        <div className="text-xl ml-1 mr-2"> ${amount} </div>
      </div>


    <div className="flex items-center">
      {calender} 
        <div className="ml-1 mr-2">{date}</div>
    </div>
   

    <div className="flex items-center">
      {detail} 
        <div className="ml-1 ">{description}</div>
    </div>
    

    <button 
      className="flex ml-auto text-2xl"
      onClick={() => removeIncomeHandler(id)}> 
      {deleteBtn}
    </button>

    </div>
  </div>


)}


export default IncomeDetails;
