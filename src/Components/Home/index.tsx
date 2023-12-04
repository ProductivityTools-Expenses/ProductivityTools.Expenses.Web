import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";

export function Home() {
  return (
    <div>
      home
      <a href="\Expenses">Expenses</a>
      <a href="\ExpenseEdit">Edit</a>
      <a href="\Login">Login</a>
      <Echo></Echo>
    </div>
  );
}
