import React from "react";
import "./App.css";
import { ExpensesTable } from "./Components/ExpensesTable";
import {Echo} from "./Components/Echo"

function App() {
  return (
    <div className="App">
      <Echo></Echo>
      <ExpensesTable></ExpensesTable>
    </div>
  );
}

export default App;
