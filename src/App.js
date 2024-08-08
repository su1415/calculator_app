import React, { useState } from "react";
import Display from "./components/Display";
import ButtonPanel from "./components/ButtonPanel";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");

  function handleClick(buttonName) {
    // console.log(buttonName);
  }

  return (
    <div className="App">
      <Display value={ displayValue } />
      <ButtonPanel onButtonClick={ handleClick } />
    </div>
  );
}

export default App;
