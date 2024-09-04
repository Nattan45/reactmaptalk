import React from 'react'
import "./sidebar.css"

import { NavLink } from "react-router-dom";
import Button from '@mui/material/Button';

const Sidebar = () => {
  return (
    <div className='SidebarContents'>
      <div className="navs">
        <NavLink exact="true" to="/MaptalksPinPage"><Button size="large" color="success">Pin Places</Button></NavLink>
        <NavLink exact="true" to="/MaptalksRoutePage"><Button size="large" color="success">Create Route</Button></NavLink>

        <Button size="large" color="success">Vehicle</Button>
        <Button size="large" color="success">E-Seal</Button>
        <Button size="large" color="success">Operators</Button>
      </div>
    </div>
  )
}

export default Sidebar