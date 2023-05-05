import React, { useState  } from "react";
import Auth from "../utils/auth"
import { ADD_EXPENSE } from "../utils/mutations";
import {useMutation} from "@apollo/client"

const userId = Auth.getProfile()?.data?._id;

function ExpenseForm() {
    const [errorMsg, setErrorMsg] = useState("");
    const [ addExpense ] = useMutation(ADD_EXPENSE)

    const [ inputState , setInputState ] = useState({
        title: "",
        amount: "",
        date: "",
        description: "",
        otherCategory: "",
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
    
    //if no description => return no added notes
    const description = inputState.description || "No added notes."
    
      try{
          const { data } = await addExpense({
              variables: {
              ...inputState,
              description: description,
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
    <div className="absolute w-auto left-1/2 transform -translate-x-1/2 sm:top-60 sm:left-96 lg:left-1/4 lg:ml-12">
    <form onSubmit={formHandler}>
    
    <div>
        <input
            type="text"
            name="title"
            value={inputState.title}
            placeholder="Expense type"
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full" 
            onChange={handleChange}

        />
    </div>

    <div>
        <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={inputState.amount}
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full"
            onChange={handleChange}
        />
    </div>

    <div>
        <input
            type="date"
            name="date"
            placeholder="Enter recieved date"
            value={inputState.date}
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full "
            onChange={handleChange}
        />
    </div>
    
    <div>
        <select
            type="category"
            name="category"
            placeholder="category"
            value={inputState.category}
            className="bg-zinc-800 mb-5 rounded-xl text-center w-full "
            onChange={handleChange}
        >
            <option value="">Select a category</option>
            <option value="house">House</option>
            <option value="entertainment">Entertainment</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="transportation">Transportation</option>
            <option value="personal-care">Personal Care</option>
            <option value="savings">Savings</option>
            <option value="vacation">Vacation</option>
            <option value="insurance">Insurance</option>
            <option value="gifts">Gifts</option>
            <option value="cellphone">Cellphone</option>
            <option value="other" >Other</option>
        </select>
        {inputState.category === 'other' && (
        <div className="bg-zinc-800 mb-5 rounded-xl text-center w-full">
            <input
                type="text"
                name="otherCategory"
                value={inputState.otherCategory}
                onChange={handleChange}
                placeholder="Enter other category"
                className="bg-zinc-800 mb-5 rounded-xl text-center w-full"
        />
        </div>
        )}

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
        className="mb-4 bg-zinc-800 rounded-xl w-full border-solid border"> Add Expense
    </button>

    </form>

    {errorMsg && <p className="text-red-900 mb-3">{errorMsg}</p>}

    </div>

    
  )
}

export default ExpenseForm;