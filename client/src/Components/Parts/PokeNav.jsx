import React from "react";
import { Link } from "react-router-dom";

export default function PokeNav(props) {
  return (
    <div className="poke_nav">
      <Link to="/">
        <button>Go to the beginning</button>
      </Link>
      <Link to="/form">
        <button>Create your own Pokemon</button>
      </Link>
      <Link to="/home">
        <button>Go to pokemon center</button>
      </Link>
    </div>
  );
}