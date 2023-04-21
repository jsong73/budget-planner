import React, { useState } from 'react';

import Navbar from './components/Navbar';
import Home from "./pages/Home"
import Transactions from './pages/Transactions';
import Income from "./pages/Income";
import Expenses from './pages/Expenses';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import "./App.css";
import"./index.css"

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext ((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
   const [ active, setActive ] = useState(1);

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
    <ApolloProvider client={client}>
          
            <Navbar active={active} setActive={setActive}/>
            {displayData()}
       
            <Signup />

            <Login />
            
    </ApolloProvider>

    </div>
  );
}

export default App;
