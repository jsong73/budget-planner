import React, { useState, createContext, useContext } from "react";
import axios from "axios"
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState(null);

  // const getIncomes = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3001/api/v1/get-incomes");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setIncomes(data);
  //     console.log(data);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  


  // const addIncome = async (income) => {
  //   try {
  //     const response = await fetch("/api/v1/add-income", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Requested-With": "XMLHttpRequest",
  //       },
  //       body: JSON.stringify(income)
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     console.log(response);
  //     setError(null);
  //   } catch (error) {
  //     console.error(error);
  //     setError(error.message);
  //   }
  // };

  return (
    <GlobalContext.Provider value={{ incomes, error, addIncome }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };