import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";

export function ExpensesTable() {
  const [expenses, setExpenses] = useState<any>();
  const [bags, setBags] = useState<any>();

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
        {bags?.map((x: any) => (
          <option>{x.name}</option>
        ))}
      </select>
      Expensestable
      {expenses &&
        expenses.map((x: any) => {
          return (
            <div>
              {x.name} | {x.bag?.name}
            </div>
          );
        })}
    </div>
  );
}
