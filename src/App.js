import React from "react";
import Display from "./components/Display";
import ButtonPanel from "./components/ButtonPanel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Display value={ 0 } />
      <ButtonPanel />
    </div>
  );
}

export default App;
