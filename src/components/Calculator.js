import React, { useState, useEffect } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";

function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [nextValue, setNextValue] = useState(null);

  useEffect(() => {
    if (typeof currentValue !== "string") {
      setCurrentValue(String(currentValue));
    }
  }, [currentValue]);

  useEffect(() => {
    if (nextValue !== null && typeof nextValue !== "string") {
      setCurrentValue(String(nextValue));
    }
  }, [nextValue]);

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

  const handleSignSwitch = () => {
    if (nextValue) {
      const newNextValue = nextValue * -1;
      setNextValue(newNextValue);
      setDisplayValue(newNextValue);
    } else {
      const newCurrentValue = currentValue * -1;
      setCurrentValue(newCurrentValue);
      setDisplayValue(newCurrentValue);
    }
  };

  const handleDecimal = () => {
    if (operator) {
      if (nextValue && nextValue.includes(".")) { return }
      const newNextValue = nextValue ? nextValue + "." : "0.";
      setNextValue(newNextValue);
      setDisplayValue(newNextValue);
    } else {
      if (currentValue.includes(".")) { return }
      const newCurrentValue = currentValue + ".";
      setCurrentValue(newCurrentValue);
      setDisplayValue(newCurrentValue);
    }
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
    } else if (buttonName === "+/-") {
      handleSignSwitch();
    } else if (buttonName === ".") {
      handleDecimal();
    } else {
      handleNumber(buttonName);
    }
  };

  return (
    <>
      <Display value={ displayValue } />
      <ButtonPanel onButtonClick={ handleClick } />
    </>
  );
}

export default Calculator;
