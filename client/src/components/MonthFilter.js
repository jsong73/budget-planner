import React from "react";

function MonthFilter({ onMonthSelect , onYearSelect }) {

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

    const years = ["2023", "2024","2025","2026", "2027", "2028", "2029","2030"];

    function handleMonthClick(index) {
      const selectedMonth = months[index];
      onMonthSelect(selectedMonth);
    }

    function handleYearChange(event){
      const selectedYear = event.target.value;
      onYearSelect(selectedYear);
    };

  return (
    <div className="flex flex-row items-center justify-center mb-6 ml-44">
      <div className="mr-4">
        <label htmlFor="year"> Year: </label>
        <select onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

     {months.map((month, index) => (
        <button
          key={index}
          className="bg-zinc-800 py-2 px-4 rounded-full mx-1 ml-2"
          onClick={() => handleMonthClick(index)}
        >
          {month}
        </button>
      ))}
    </div>
  )}


export default MonthFilter;
