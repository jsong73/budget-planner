import React from "react";
import { navItems } from "../utils/navItems.js"

function Navbar({ 
  active, 
  setActive 
}) 
{
  return (
    <div className="md:ml-12 md:bottom-1/2 md:absolute flex flex-col md:flex-row">
        <ul id="nav-container" className="md:mr-10 ">
        {navItems.map((nav) => {
            return (
            <li 
              key={nav.id}
              //if active is equal to the nav ID then give class of active
              className={active === nav.id ? "active" : ""}
              onClick={() => setActive(nav.id)}

            > 
              <div className="inline-block mr-2">{nav.icon}</div>
              {nav.title}
       
            
            </li>
            )
        })}
        </ul>
    </div>
  )}


export default Navbar;
