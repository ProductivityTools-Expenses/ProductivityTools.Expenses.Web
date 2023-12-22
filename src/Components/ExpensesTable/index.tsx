import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Expense from "../../Objects/Expense";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import { debug } from "console";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useQuery from "../../Tools/NavigationExtensions";

export function ExpensesTable() {
  let query = useQuery();

  const [expenses, setExpenses] = useState<Expense[]>();
  const [bags, setBags] = useState<Bag[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [selectedBag, setSelectedBag] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    debugger;
    const fetchData = async () => {
      if (query.get("bagId") != null) {
        setSelectedBag(Number(query.get("bagId")));
      }
      if (query.get("categoryId") != null) {
        setSelectedCategory(Number(query.get("categoryId")));
      }
      const data = await api.getExpenses(selectedBag, selectedCategory);
      setExpenses(data);
    };
    fetchData();
  }, [selectedBag, selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getBags();
      setBags(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedBag != null) {
        const data = await api.getCategories(selectedBag);
        setCategories(data);
      }
    };
    fetchData();
  }, [selectedBag]);

  return (
    <div>
      <div>query:{query.get("bagId")}</div>
      <Link to="/">Home</Link>
      <span>
        {" "}
        selectedBag: {selectedBag} selectedCategory:{selectedCategory}
      </span>
      <br />
      <select name="bags" value={selectedBag?.toString()} onChange={(e) => setSelectedBag(Number(e.target.value))}>
        {bags?.map((x: Bag) => (
          <option key={x.bagId} value={x.bagId}>
            {x.name}
          </option>
        ))}
      </select>
      <select
        name="categories"
        value={selectedCategory?.toString()}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
      >
        {categories?.map((x: Category) => (
          <option key={x.categoryId} value={x.categoryId || -1}>
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
            <td>name</td>
            <td>category</td>
            <td>name</td>
            <td>date</td>
            <td>price</td>
            <td>amount</td>
            <td>value</td>
            <td>additions</td>
            <td>deductions</td>
            <td>
              {" "}
              {expenses
                ?.reduce((accumualtor: number, object: Expense) => {
                  return accumualtor + object!.cost!;
                }, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
