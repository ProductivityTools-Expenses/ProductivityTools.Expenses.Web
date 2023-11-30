import React from "react";
import "./App.css";
import {Home} from "./Components/Home"
import { ExpensesTable } from "./Components/ExpensesTable";
import { ExpenseEdit } from "./Components/ExpenseEdit";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Expenses" element={<ExpensesTable />} />
          <Route path="/ExpenseEdit" element={<ExpenseEdit />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
