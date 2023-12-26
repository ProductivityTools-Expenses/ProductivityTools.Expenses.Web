import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";
import { logout } from "../../Session/firebase";

export function Home() {

  return (
    <div>
      home
      <ul>
        <li><a href="\Expenses">Expenses</a></li>
        <li><a href="\ExpenseAdd">Add Expense</a></li>
        <li><a href="\CategoryEdit">Add Category</a></li>
        <li><a href="\Login">Login</a></li>
        <li><button onClick={logout}>logout</button></li>
      </ul>
      
      
      
      
      
      <Echo></Echo>
    </div>
  );
}
