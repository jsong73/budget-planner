import React, { useState } from "react";

function MonthFilter(props) {

    const { onMonthSelect } = props;

    const monthNames = [
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

    const [selectedMonth, setSelectedMonth] = useState(null);
    
    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        onMonthSelect(month)
    }

  return (
    <div className="mb-5">
      {monthNames.map((month) => (

        <button
          key={month}
          className={`mx-2 px-4 py-2 rounded-md ${
            month === selectedMonth ? "bg-zinc-600" : "bg-zinc-800"
          }`}
          onClick={() => handleMonthSelect(month)}
        >
          {month}
        </button>
      ))}
    </div>
  )}


export default MonthFilter;
