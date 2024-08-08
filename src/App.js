import React, { useState } from "react";
import Display from "./components/Display";
import ButtonPanel from "./components/ButtonPanel";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [nextValue, setNextValue] = useState(null);

  const performOperation = (left, right, operator) => {
    const a = Number(left);
    const b = Number(right);
    if (operator === "+") { return a + b; }
    if (operator === "-") { return a - b; }
    if (operator === "*") { return a * b; }
    if (operator === "/") { return a / b; }
    return right;
  };

  function handleClick(buttonName) {
    if (buttonName === "") {
      return;
    }

    if (buttonName === "C") {
      setDisplayValue("0");
      setCurrentValue("0");
      setOperator(null);
      setNextValue(null);
      return;
    }

    if (buttonName === "=") {
      if (!currentValue || !operator || !nextValue) { return }
      const newDisplayValue = performOperation(currentValue, nextValue, operator);
      setDisplayValue(newDisplayValue);
      setCurrentValue(newDisplayValue);
      setOperator(null);
      setNextValue(null);
      return;
    }

    if (["+", "-", "*", "/"].includes(buttonName)) {
      if (!currentValue || !operator || !nextValue) {
        setOperator(buttonName);
        return;
      }
      const newDisplayValue = performOperation(currentValue, nextValue, operator);
      setDisplayValue(newDisplayValue);
      setCurrentValue(newDisplayValue);
      setOperator(buttonName);
      setNextValue(null);
      return;
    }

    // 0-9
    if (operator) {
      const newNextValue = (nextValue === null || nextValue ==="0") ? buttonName : nextValue + buttonName;
      setNextValue(newNextValue);
      setDisplayValue(newNextValue);
    } else {
      const newCurrentValue = currentValue === "0" ? buttonName : currentValue + buttonName;
      setCurrentValue(newCurrentValue);
      setDisplayValue(newCurrentValue);
    }
  }

  return (
    <div className="App">
      <Display value={ displayValue } />
      <ButtonPanel onButtonClick={ handleClick } />
    </div>
  );
}

export default App;
