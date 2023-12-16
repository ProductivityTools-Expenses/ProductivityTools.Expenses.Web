import React from "react";
import "./App.css";
import { Home } from "./Components/Home";
import { ExpensesTable } from "./Components/ExpensesTable";
import { ExpenseEdit } from "./Components/ExpenseEdit";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./Session/AuthContext";
import Login from "./Session/Login";
import { CategoryEdit } from "./Components/CategoryEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Expenses" element={<ExpensesTable />} />
            <Route path="/ExpenseEdit" element={<ExpenseEdit />} />
            <Route path="/CategoryEdit" element={<CategoryEdit />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
