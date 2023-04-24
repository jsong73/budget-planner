import React, { useState  } from "react";
import Auth from "../utils/auth"
import { ADD_INCOME } from "../utils/mutations";
import {useMutation} from "@apollo/client"

const userId = Auth.getProfile()?.data?._id;

function Form() {

    const [addIncome] = useMutation(ADD_INCOME)

    const [ inputState , setInputState ] = useState({
        title: "",
        amount: "",
        date: "",
        description: "",
        userId: userId,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputState((prevState) => {
            return{
            ...prevState,
            [name]: value,
        }
      });
    };

const handleSubmit = (event) => {
    event.preventDefault();

    setInputState({
        title: "",
        amount: "",
        date: "",
        description: "",
        userId: userId
    })
    console.log(event);
}


const formHandler = async (event) => {
    event.preventDefault();
      try{
          const { data } = await addIncome({
              variables: {
              ...inputState,
              }
          });
          console.log(data)
          window.location.reload();
      } catch (error) {
          console.log(error)
      };
  };

  return (
    <div className="absolute w-auto top-60 left-96 ">
    <form onSubmit={handleSubmit}>
    
    <div>
        <input
            type="text"
            name="title"
            value={inputState.title}
            placeholder="Income type"
            className="bg-zinc-800 mb-5 rounded-xl text-center" 
            onChange={handleChange}

        />
    </div>

    <div>
        <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={inputState.amount}
            className="bg-zinc-800 mb-5 rounded-xl text-center"
            onChange={handleChange}
        />
    </div>

    <div>
        <input
            type="date"
            name="date"
            placeholder="Enter recieved date"
            // selected={date}
            value={inputState.date}
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full "
            onChange={handleChange}
        />
    </div>

    <div>
        <textarea 
            name="description" 
            value={inputState.description} 
            id="description" 
            placeholder="Description" 
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full"
            onChange={handleChange}>
        </textarea>
    </div>

    <button 
        type="submit" 
        onClick={formHandler}
        className="mb-4 bg-zinc-800 rounded-xl w-full border-solid border"> Add income
    </button>

    </form>
    </div>
  )
}

export default Form;