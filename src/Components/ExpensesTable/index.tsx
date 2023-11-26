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
          <option value={x.bagId}>{x.name}</option>
        ))}
      </select>
      <br />
      Expensestable
      <table>
        <thead>
          <td>Category</td>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((x: Expense) => {
              return (
                <tr>
                  <td>{x.bag?.name}</td>
                  <td>{x.name}</td>
                  <td>{x.value}</td>
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
