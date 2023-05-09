import React from "react";
import Chart from "../components/Chart"
import Auth from "../utils/auth"

function Home() {
  return (
    <div>
        <div className="flex justify-center items-center mt-12">
            <h1 className="font-bold text-3xl">Home</h1>
        </div>

        <Chart isLoggedInUser = {Auth.loggedIn() === true}/>
{/* 
        <h1 className=""> Total Income To Date </h1> */}
    </div>
  )}


export default Home;
