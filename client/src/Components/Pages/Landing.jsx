import React from 'react';
import {Link} from "react-router-dom"

function Landing(props) {
  return (
    <div>
      <h1>Welcome to Pokemon center</h1>
      <Link to = "/home"><button onClick={props.onClick}>Go to Pokemon Center</button></Link> 
    </div>
  );
}

export default Landing;