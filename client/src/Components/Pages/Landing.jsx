import React from 'react';
import { Link } from "react-router-dom"

function Landing(props) {
  return (
    <div className='fondo-landing'>
      <h1  className='welcome-text'>Welcome to Pokemon center</h1>
      <Link to="/home"><button className="pokeball-button" onClick={props.onClick}></button></Link>
    </div>
  );
}

export default Landing;