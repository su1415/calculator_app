import React from "react";

function Button({ name, onButtonClick }) {
  return (
    <button onClick={ () => onButtonClick(name) }>
      { name }
    </button>
  );
}

export default Button;
