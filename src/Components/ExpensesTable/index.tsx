import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Expense from "../../Objects/Expense";
import Bag from "../../Objects/Bag";
import { debug } from "console";

export function ExpensesTable() {
  const [expenses, setExpenses] = useState<Expense[]>();
  const [bags, setBags] = useState<Bag[]>();
  const [selectedBag, setSelectedBag] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getExpenses(selectedBag);
      setExpenses(data);
    };
    fetchData();
  }, [selectedBag]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getBags();
      setBags(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <span> selectedBag: {selectedBag}</span>
      <br />
      <select name="bags" onChange={(e) => setSelectedBag(Number(e.target.value))}>
        {bags?.map((x: Bag) => (
          <option key={x.bagId} value={x.bagId}>
            {x.name}
          </option>
        ))}
      </select>
      <br />
      Expensestable
      <table>
        <thead>
          <tr>
            <th>Bag</th>
            <th>Category</th>
            <th>Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Value</th>
            <th>Additions</th>
            <th>Deductions</th>
            <th>Cost</th>
            {/* <th>Comment</th>             */}
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((x: Expense) => {
              return (
                <tr key={x.expenseId}>
                  <td>{x.bag?.name}</td>
                  <td>{x.category?.name}</td>
                  <td>{x.name}</td>
                  <td>{x.date?.toString()}</td>
                  <td>{x.price}</td>
                  <td>{x.amount}</td>
                  <td>{x.value}</td>
                  <td>{x.additions}</td>
                  <td>{x.deductions}</td>
                  <td>{x.cost}</td>
                  {/* <td>{x.comment}</td> */}
                  
                  {/* <td>{x.comment}</td> */}
                  {/* <td>{x.discount}</td> */}
                </tr>
              );
            })}
          <tr>
            <td>f</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
