import React, { useState , useContext } from "react"
import axios from "axios"

const URL = "http://localhost:3001/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    
    const [incomes, setIncomes ] = useState([]);
    const [expenses, setExpenses ] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async (income) => {
        const response = await axios.post(`${URL}add-income`, income)
            .catch((error) => {
                setError(error.response.data.message)
            })
            console.log(response)
            console.log(error)
    };

    return (
            <GlobalContext.Provider 
                value={{ 
                    addIncome,
                }}>
                {children}
            </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}