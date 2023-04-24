import React from "react";

function IncomeDetails({
    id,
    title,
    amount,
    date, 
    description
}) {
console.log(title)
console.log(amount)
console.log(id)
console.log(date)
console.log(description)

  return (
    <div>
<h1>{title}</h1>
<div>{amount}</div>
<div>{date}</div>
<div></div>
<div></div>

    </div>
  )}


export default IncomeDetails;
