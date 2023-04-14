import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from "./components/Home"
import Transactions from './components/Transactions';
import Income from "./components/Income";
import Expenses from './components/Expenses';
import { useGlobalContext } from './context/globalContext';


function App() {
   const [ active, setActive ] = useState(1);

   const global = useGlobalContext()
   console.log(global);
   
  //switch case
   const displayData = () => {
    switch(active){
      case 1:
        return <Home />
      case 2: 
        return <Transactions />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default: 
        return <Home />
    }
   }
  

  return (
    <div className="App">
        <Navbar active={active} setActive={setActive}/>
        {displayData()}
    </div>
  );
}

export default App;
