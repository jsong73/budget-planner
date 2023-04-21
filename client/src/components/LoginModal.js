import React , { useState } from "react";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth"

const LoginModal = (props) => {

    const [formState, setFormState] = useState({
        email: "",
        password: "",
      });
    
      const [login, {error}] = useMutation(LOGIN_USER);
    
      const handleChange = (event) => {
        const {name, value} = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
      const formHandler = async (event) => {
        event.preventDefault();
        try{
          const { data } = await login({
            variables: {...formState}
          });
          console.log(data)
          Auth.login(data.login.token);
        } catch (error) {
          console.log(error);
        }
    
        setFormState({
          email: "",
          password: "",
        });
      };

  return (
    <div>

     <h1>Login</h1>
        
         <form onSubmit={formHandler}>

            <label> Email </label>
              <input
               name="email"
               type="email"
               value={formState.email}
               autoComplete="off"
               onChange={handleChange} />


              <label> Password </label>
              <input
               name="password"
               type="password"
               value={formState.password}
               autoComplete="off"
               onChange={handleChange} />


              
            {error ? (
              <div> {error.message} </div>
            ) : null}
            <button type="submit"> Submit </button>

          </form>
    </div>
  )}


export default LoginModal;
