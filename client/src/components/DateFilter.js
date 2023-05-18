import React, {useState} from "react";

function DateFilter({ onMonthSelect , onYearSelect }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(null);

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

    const years = [
        "2023", 
        "2024",
        "2025",
        "2026", 
        "2027", 
        "2028", 
        "2029",
        "2030"
    ];

    function handleMonthClick(index) {
      const selectedMonth = months[index];
      onMonthSelect(selectedMonth);
      setSelectedMonthIndex(index);
    }

    function handleYearChange(event){
      const selectedYear = event.target.value;
      onYearSelect(selectedYear);
    };


  return (
    <div className="flex items-center justify-center mb-6 lg:ml-44">
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
      
  {/* Mobile Hamburger Menu for month filter*/}
    <div className="lg:hidden">
        <button
          className="bg-zinc-600 py-2 px-4 rounded-full ml-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg
            className="w-6 h-6 text-white transition duration-300 transform"
            viewBox="0 0 24 24"
          >
            {showMenu ? (
              <path
                fillRule="evenodd"
                d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
              />
            )}
          </svg>
        </button>

        {showMenu && (
          <div className="absolute z-10 top-10 right-0 bg-zinc-700 rounded shadow mt-2">
            {months.map((month, index) => (
              <button
                key={index}
                className={`block py-2 px-4 w-full text-left ${
                  selectedMonthIndex === index ? "bg-zinc-600" : ""
                }`}
                onClick={() => handleMonthClick(index)}
              >
                {month}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Month filter */}
      <div className="hidden lg:block">
        {months.map((month, index) => (
          <button
            key={index}
            className={`bg-zinc-800 py-2 px-4 rounded-full mx-1 ml-2 ${
              selectedMonthIndex === index ? "bg-zinc-600" : ""
            }`}
            onClick={() => handleMonthClick(index)}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateFilter;