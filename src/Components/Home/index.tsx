import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";
import { logout } from "../../Session/firebase";

export function Home() {

  return (
    <div>
      <table>
      <tr >
          <td colSpan={8}><Echo></Echo></td>
        </tr>
        <tr>
          <td><a href="\Expenses">Expenses</a></td>
          <td><a href="\ExpenseAdd">Add Expense</a></td>
          <td><a href="\CategoryEdit">Add Category</a></td>
          <td><a href="\Login">Login</a></td>
          <td><a href="\BagAdd">Add Bag</a></td>
          <td><a href="\BagsTable">Bags Table</a></td>
          <td><a href="\CategoriesTable">Categories Table</a></td>
          <td><button onClick={logout}>logout</button></td>
        </tr>
       
      </table>
      home
  
          
      
      
      
      <ExpensesTable></ExpensesTable>
    </div>
  );
}
