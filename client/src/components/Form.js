import React, { useState } from "react";
import { useGlobalContext } from "../context/globalContext";

function Form() {
    const { addIncome }  = useGlobalContext();

    const [ inputState , setInputState ] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    })

const { title, amount, date, category, description } = inputState;

// console.log(title)
// console.log(amount)
// console.log(date)
// console.log(category)
// console.log(description)

const handleInput = name => e => {
    setInputState({...inputState, [name]: e.target.value})
}

const handleSubmit = (event) => {
    event.preventDefault()
    addIncome(inputState)
    setInputState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: "",
    })
    console.log(event)
}

  return (
    <div className="absolute w-auto top-60 left-96 ">
    <form onSubmit={handleSubmit}>
    
    <div>
        <input
            type="text"
            name={"title"}
            value={title}
            placeholder="Income type"
            className="bg-zinc-800 mb-5 rounded-xl text-center" 
            onChange={handleInput("title")}
        />
    </div>
    <div>
        <input
            type="number"
            name={"amount"}
            placeholder="Amount"
            value={amount}
            className="bg-zinc-800 mb-5 rounded-xl text-center"
            onChange={handleInput("amount")}
        />
    </div>
    <div>
        <input
            type="date"
            name={"date"}
            placeholder="Enter recieved date"
            selected={date}
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full "
            onChange={handleInput("date")}
        />
    </div>
    <div>
        <textarea 
            name="description" 
            value={description} 
            id="description" 
            placeholder="Description" 
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full"
            onChange={handleInput("description")}>
        </textarea>
    </div>
    <div>
        <select 
            required value={category} 
            name="category" 
            id="category" 
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full"
            onChange={handleInput("category")}>
                <option value=""  disabled >Select Option</option>
                <option value="Paycheck-1">Paycheck 1</option>
                <option value="Paycheck-2">Paycheck 2</option>
                <option value="Paycheck-3">Paycheck 3</option>
                <option value="Paycheck-4">Paycheck 4</option>
        </select>
    </div>

    <button type="submit" className="mb-4 bg-zinc-800 rounded-xl w-3/4 border-solid border  w-full">Add income</button>

    </form>
    </div>
  )
}

export default Form;