import React from "react";
import Display from "./components/Display";
import "./App.css";

function App() {
  const buttons = [
    ["C", "", "", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["", "0", "", "="],
  ];

  return (
    <div className="App">
      <Display value={ 0 } />
      <div className="button-panel">
        { buttons.map((row, rowIndex) => (
          <div key={ rowIndex } className="button-row">
            { row.map((buttonName, colIndex) => (
              <button key={ rowIndex * row.length + colIndex }>
                { buttonName }
              </button>
            )) }
          </div>
        )) }
      </div>
    </div>
  );
}

export default App;
