import React from "react";
import Button from "./Button";

function ButtonPanel() {
  const buttons = [
    ["C", "", "", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["", "0", "", "="],
  ];

  return (
    <div className="button-panel">
      { buttons.map((row, rowIndex) => (
        <div key={ rowIndex } className="button-row">
          { row.map((buttonName, colIndex) => (
            <Button
              key={ rowIndex * row.length + colIndex }
              name={ buttonName }
            />
          )) }
        </div>
      )) }
    </div>
  );
}

export default ButtonPanel;
