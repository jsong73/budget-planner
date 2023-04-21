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
        //   console.log(data)
          Auth.login(data.login.token);
        } catch (error) {
            if (error.message.includes("404")) {
                error.message = "Incorrect credentials"
            }
          console.log(error);
        }
    
        setFormState({
          email: "",
          password: "",
        });
      };

  return (
    <div className="p-5 max-w-sm mx-auto">

     <h1 className="font-bold text-2xl mb-6">Login</h1>
        
         <form onSubmit={formHandler}>

             <div className="mb-4">
                <label className="mr-4"> Email </label>
                  <input
                        className="w-3/4"
                        name="email"
                        type="email"
                        value={formState.email}
                        autoComplete="off"
                        onChange={handleChange} />
            </div>

            <div className="mb-4">
                <label className="mr-4"> Password </label>
                    <input
                        className="w-3/5"
                        name="password"
                        type="password"
                        value={formState.password}
                        autoComplete="off"
                        onChange={handleChange} />
            </div>
              
            {error ? (
              <div className="text-red-900 text-base float-left"> {error.message} </div>
            ) : null}
            
            <button 
                className="border border-white rounded-lg px-3 float-right font-bold py-1 mb-2 mt-3"
                type="submit"> Submit 
            </button>

          </form>
    </div>
  )}


export default LoginModal;
