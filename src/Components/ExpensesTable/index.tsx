import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";

export function ExpensesTable() {
  const [expenses, setExpenses] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getExpenses();
      setExpenses(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      Expensestable
      {expenses &&
        expenses.map((x: any) => {
          return <div>{x.name} | {x.bag?.name}</div>;
        })}
    </div>
  );
}
