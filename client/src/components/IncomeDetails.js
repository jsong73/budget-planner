import React from "react";
import { money , calender , detail , profit } from "../utils/Icons"


function IncomeDetails({
    id,
    title,
    amount,
    date, 
    description
}) {
// console.log(title)
// console.log(amount)
// console.log(id)
// console.log(date)
// console.log(description)

  return (

  <div className="flex w-full h-32 ml-80 sm:right-60">
    <div className="border border-white rounded-lg p-4 mb-4 flex w-full">

      <div className="flex items-center">
        {profit}
          <h1 className="font-bold text-xl ml-1 mr-2"> {title} </h1>
      </div>


      <div className="flex items-center">
        {money}
        <h1 className="text-xl ml-1 mr-2"> ${amount} </h1>
      </div>


    <div className="flex items-center">
      {calender} 
        <div className="ml-1 mr-2">{date}</div>
    </div>
   

    <div className="flex items-center">
      {detail} 
        <div className="ml-1 ">{description}</div>
    </div>

    </div>
  </div>
  )}


export default IncomeDetails;
