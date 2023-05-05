import React, { useState  } from "react";
import Auth from "../utils/auth"
import { ADD_INCOME } from "../utils/mutations";
import {useMutation} from "@apollo/client"

const userId = Auth.getProfile()?.data?._id;

function IncomeForm() {
    const [errorMsg, setErrorMsg] = useState("");
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

const formHandler = async (event) => {
    event.preventDefault();

    const { title, amount, date } = inputState;
    //input field validations
    if (!title) {
      setErrorMsg("Income source field is required");
      return;
    }

    if (!amount || amount <= 0) {
      setErrorMsg("Amount field is required");
      return;
    }
    if (!date) {
      setErrorMsg("Date field is required");
      return;
    }

    // Check if date is in the future
    // const today = new Date();
    // const inputDate = new Date(date);
    // if (inputDate > today) {
    // setErrorMsg("Date must not be in the future");
    // return;
    // }
    
    //if no description => return no added notes
    const description = inputState.description || "No added notes."
    
      try{
          const { data } = await addIncome({
              variables: {
              ...inputState,
              description: description
              }
          });
          console.log(data)

    //resets form inputs
    setInputState({
        title: "",
        amount: "",
        date: "",
        description: "",
        userId: userId,
    });
    
    setErrorMsg("");
    
    window.location.reload();

    } catch (error) {
        console.log(error)
    };
  };



  return (
    <div className="mt-8 absolute w-auto left-1/2 transform -translate-x-1/2 sm:top-60 sm:left-96 lg:left-1/4 lg:ml-12">
    <form onSubmit={formHandler}>
    
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

    {errorMsg && <p className="text-red-900 mb-3">{errorMsg}</p>}

    <button 
        type="submit" 
        onClick={formHandler}
        className="mb-4 bg-zinc-800 rounded-xl w-full border-solid border"> Add income
    </button>

    </form>


    </div>

    
  )
}

export default IncomeForm;