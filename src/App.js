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

  const handleClear = () => {
    setDisplayValue("0");
    setCurrentValue("0");
    setOperator(null);
    setNextValue(null);
  };

  const handleEqual = () => {
    // Note: 3つ全てがtrueでなければreturn を明記するため 常にtrueである currentValue も記載する
    if (!currentValue || !operator || !nextValue) { return }
    const newDisplayValue = performOperation(currentValue, nextValue, operator);
    setDisplayValue(newDisplayValue);
    setCurrentValue(newDisplayValue);
    setOperator(null);
    setNextValue(null);
  };

  const handleOperator = (buttonName) => {
    // Note: 3つ全てtrueであれば計算する を明記するため 常にtrueである currentValue も記載する
    if (currentValue && operator && nextValue) {
      const newDisplayValue = performOperation(currentValue, nextValue, operator);
      setDisplayValue(newDisplayValue);
      setCurrentValue(newDisplayValue);
    }
    setOperator(buttonName);
    setNextValue(null);
  };

  const handleNumber = (buttonName) => {
    if (operator) {
      const newNextValue = (nextValue === null || nextValue ==="0") ? buttonName : nextValue + buttonName;
      setNextValue(newNextValue);
      setDisplayValue(newNextValue);
    } else {
      const newCurrentValue = currentValue === "0" ? buttonName : currentValue + buttonName;
      setCurrentValue(newCurrentValue);
      setDisplayValue(newCurrentValue);
    }
  };

  const handleClick = (buttonName) => {
    if (buttonName === "") {
      return;
    } else if (buttonName === "C") {
      handleClear();
    } else if (buttonName === "=") {
      handleEqual();
    } else if (["+", "-", "*", "/"].includes(buttonName)) {
      handleOperator(buttonName);
    } else {
      handleNumber(buttonName);
    }
  };

  return (
    <div className="App">
      <Display value={ displayValue } />
      <ButtonPanel onButtonClick={ handleClick } />
    </div>
  );
}

export default App;
