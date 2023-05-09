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

        <div className="flex justify-center items-center">
            <h1> Total Income to Date </h1>
            <div className="border-b-2 border-gray-300 "></div>
        </div>

    </div>
  )}


export default Home;
