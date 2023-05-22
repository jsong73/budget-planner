import React from "react";
import { money , calender , detail , wallet , deleteBtn} from "../utils/Icons"
import { useMutation } from "@apollo/client";
import { REMOVE_EXPENSE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

function ExpenseDetails({ 
    title,
    amount, 
    date, 
    id,
    category,
    description,
}) {
// console.log(title)
// console.log(amount)
// console.log(date)
// console.log(category)
// console.log(description)

const [ removeExpense ] = useMutation(REMOVE_EXPENSE, {
    update(cache, {data: {removeExpense}}) {
        try{
            cache.readQuery({
                query: QUERY_ME,
                data: {me: removeExpense },
            });
        } catch (error) {
            console.log(error)
        }
    },
});

const removeExpenseHandler = async ( expenseId ) => {
    try{
        const { data } = await removeExpense({
            variables: { expenseId },
        });
        console.log(data)
        window.location.reload();
    } catch (error) {
        console.log(error)
    }
};

  return (
    <div className="flex w-full h-32 ml-80">
        <div className="border border-white rounded-lg p-4 mb-4 flex w-screen ">

        <div className="flex items-center">
            {wallet}
            <h1 className="font-bold ml-1 mr-2 text-xs lg:text-xl"> {title} </h1>
        </div>

        <div className="flex items-center">
            {money}
            <div className="ml-1 mr-2 text-xs lg:text-xl"> ${amount} </div>
        </div>

        <div className="flex items-center">
            {calender} 
            <div className="ml-1 mr-2 text-xs lg:text-xl">{date}</div>
        </div>

        <div className="flex items-center">
            {detail} 
            <div className="ml-1 mr-2 text-xs lg:text-xl">{category} </div>
        </div>
   
        <div className="flex items-center">
            {detail} 
            <div className="ml-1 text-xs lg:text-xl">{description}</div>
        </div>

        
    <button 
      className="flex ml-auto text-sm lg:text-2xl"
      onClick={() => removeExpenseHandler(id)}> 
      {deleteBtn}
    </button>

    </div>
  </div>

  )}


export default ExpenseDetails;
