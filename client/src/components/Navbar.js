import React from "react";
import { navItems } from "../utils/navItems.js"

function Navbar({ 
  active, 
  setActive }) 
{
  return (
    <div>
        <ul id="nav-container">
        {navItems.map((nav) => {
            return (
            <li 
              key={nav.id}
              //if active is equal to the nav ID then give class of active
              className={active === nav.id ? "active" : ""}
              onClick={() => setActive(nav.id)}

            > 
              {nav.icon}
              {nav.title}
            </li>
            )
        })}
        </ul>
    </div>
  )}


export default Navbar;
