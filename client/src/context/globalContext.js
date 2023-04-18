import React, { useState , useContext } from "react";
import axios from "axios";

const URL = "localhost:3001/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    
    const [incomes, setIncomes ] = useState([]);
    const [expenses, setExpenses ] = useState([]);
    const [error, setError] = useState(null);


    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${URL}add-income`, income);
            // console.log(response);
            setError(null);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong.");
            }
        }
    };

    
    const getIncomes = async () => {
    try {
        const response = await axios.get(`${URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
        setError(null);
    } catch (error) {
        if (error.response && error.response.data) {
            setError(error.response.data.message);
        } else {
            setError("Something went wrong.");
        }
    }
};

getIncomes();
    return (
            <GlobalContext.Provider 
                value={{ 
                    getIncomes,
                    addIncome,
                    incomes
                }}>
                {children}
            </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}