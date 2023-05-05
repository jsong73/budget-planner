import React, { useState } from "react";

function MonthFilter({ onMonthSelect }) {

    const months = [
        "January", 
        "February", 
        "March",
        "April", 
        "May", 
        "June", 
        "July",
        "August", 
        "September", 
        "October",
        "November", 
        "December"
    ];

    function handleMonthClick(index) {
      const selectedMonth = months[index];
      onMonthSelect(selectedMonth);
    }

  return (
    <div className="flex flex-row items-center justify-center mb-6 ml-36">
     {months.map((month, index) => (
        <button
          key={index}
          className="bg-zinc-800 py-2 px-4 rounded-full mx-1"
          onClick={() => handleMonthClick(index)}
        >
          {month}
        </button>
      ))}
    </div>
  )}


export default MonthFilter;
