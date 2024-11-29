import React from "react";
import "./App.css";
import { Home } from "./Components/Home";
import { ExpensesTable } from "./Components/ExpensesTable";
import { ExpenseEdit } from "./Components/ExpenseEdit";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { AuthProvider } from "./Session/AuthContext";
import Login from "./Session/Login";
import { CategoryEdit } from "./Components/CategoryEdit";
import { CategoriesTable } from "./Components/CategoriesTable";
import { BagEdit } from "./Components/BagEdit";
import { BagsTable } from "./Components/BagsTable";
import {TagExpensesTable} from "./Components/TagExpensesTable"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
            <Route path="/ExpenseAdd" element={<ExpenseEdit />} />
            <Route path="/ExpenseEdit/:expenseId" element={<ExpenseEdit />} />
            <Route path="/BagAdd" element={<BagEdit />} />
            <Route path="/BagEdit/:bagId" element={<BagEdit />} />
            <Route path="/BagsTable" element={<BagsTable />} />
            <Route path="/CategoryEdit/:categoryId?/:backUrl?/:urlParam?" element={<CategoryEdit />} />
            <Route path="/CategoriesTable" element={<CategoriesTable />} />
            <Route path="/TagExpensesTable" element={<TagExpensesTable />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />

    </div>
  );
}

export default App;
