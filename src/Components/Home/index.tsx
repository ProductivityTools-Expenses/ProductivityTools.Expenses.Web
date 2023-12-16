import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";
import { logout } from "../../Session/firebase";

export function Home() {


  return (
    <div>
      home
      <a href="\Expenses">Expenses</a>
      <a href="\ExpenseEdit">ExpenseEdit</a>
      <a href="\CategoryEdit">CategoryEdit</a>
      <a href="\Login">Login</a>
      <button onClick={logout}>logout</button>
      <Echo></Echo>
    </div>
  );
}
