import React, { useState } from "react";
import DatePicker from "react-datepicker"
import { useGlobalContext } from "../context/globalContext";

function Form() {
    const { addIncome}  = useGlobalContext;

    const [ inputState , setInputState ] = useState({
        title: "",
        amount: "",
        date: "",
        category: "",
        description: ""
    })

const { title, amount, date, category, description } = inputState;

const handleInput = name => e => {
    setInputState({...inputState, [name]: e.target.value})
}

const handleSubmit = e => {
    e.preventDefault();
    addIncome(inputState)
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
            type="text"
            name={"amount"}
            value={title}
            placeholder="Amount"
            onChange={handleInput("amount")}
        />
    </div>
    <div>
        <DatePicker
            name={"date"}
            placeholder="Enter recieved date"
            selected={date}
            dateFormat="dd/MM/yyyy"
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