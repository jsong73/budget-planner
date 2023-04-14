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

  return (
    <div>
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
        <input
            type="text"
            name={"category"}
            value={title}
            placeholder="Paycheck"
            onChange={handleInput("category")}
        />
        <input
            type="text"
            name={"description"}
            value={title}
            placeholder="Paycheck"
            onChange={handleInput("description")}
        />
        <input
            type="text"
            name={"title"}
            value={title}
            placeholder="Paycheck"
            onChange={handleInput("title")}
        />

    </div>
  )
}

export default Form;