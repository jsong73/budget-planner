import React, { useState } from "react";
import { useGlobalContext } from "../context/globalContext";

function Form() {
    const { addIncome }  = useGlobalContext;

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
    <div>
    <form onSubmit={handleSubmit}>
    
    <div>
        <input
            type="text"
            name={"title"}
            value={title}
            placeholder="Paycheck"
            onChange={handleInput("title")}
        />
    </div>
    <div>
        <input
            type="number"
            name={"amount"}
            value={amount}
            onChange={handleInput("amount")}
        />
    </div>
    <div>
        <input
            type="date"
            name={"date"}
            placeholder="Enter recieved date"
            selected={date}
            onChange={(date) => {
                setInputState({...inputState, date: date})
            }}
        />
    </div>
    <div>
        <textarea 
            name="description" 
            value={description} 
            id="description" 
            placeholder="Notes" 
            onChange={handleInput("description")}>
        </textarea>
    </div>
    <div>
        <select 
            required value={category} 
            name="category" 
            id="category" 
            onChange={handleInput("category")}>
                <option value=""  disabled >Select Option</option>
                <option value="Paycheck-1">Paycheck 1</option>
                <option value="Paycheck-2">Paycheck 2</option>
                <option value="Paycheck-3">Paycheck 3</option>
                <option value="Paycheck-4">Paycheck 4</option>
        </select>
    </div>

        <div className="submit-btn"> Add income</div>
    
    </form>
    </div>
  )
}

export default Form;