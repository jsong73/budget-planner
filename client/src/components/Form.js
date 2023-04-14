import React, { useState } from "react";
import DatePicker from "react-datepicker"

function Form() {
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
}

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            name={"title"}
            value={title}
            placeholder="Paycheck"
            onChange={handleInput("title")}
        />
        <input
            type="text"
            name={"amount"}
            value={title}
            placeholder="Amount"
            onChange={handleInput("amount")}
        />
        <DatePicker
            name={"date"}
            placeholder="Enter recieved date"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => {
                setInputState({...inputState, date: date})
            }}
        />
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
        <textarea 
            name="description" 
            value={description} 
            id="description" 
            placeholder="Notes" 
            onChange={handleInput("description")}>
        </textarea>
        <input
            type="text"
            name={"title"}
            value={title}
            placeholder="Paycheck"
            onChange={handleInput("title")}
        />

        <div className="submit-btn"></div>
    
    </form>
    </div>
  )
}

export default Form;