import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Expense from "../../Objects/Expense";
import Bag from "../../Objects/Bag";
import { debug } from "console";

export function ExpensesTable() {
  const [expenses, setExpenses] = useState<Expense[]>();
  const [bags, setBags] = useState<Bag[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getExpenses();
      setExpenses(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getBags();
      setBags(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <select name="bags">
        {bags?.map((x: Bag) => (
          <option >{x.name}</option>
        ))}
      </select>
      Expensestable
      {expenses &&
        expenses.map((x: Expense) => {
          return (
            <div>
              {x.name} | {x.bag?.name}
            </div>
          );
        })}
    </div>
  );
}
