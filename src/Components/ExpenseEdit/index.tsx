import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import Expense from "../../Objects/Expense";
import { useNavigate, useParams } from "react-router-dom";
import { debug } from "console";

export function ExpenseEdit() {
  let { expenseId } = useParams();
  console.log("expenseid param");
  console.log(expenseId);

  let navigate = useNavigate();
  const [bags, setBags] = useState<Bag[]>();
  const [categories, setCategories] = useState<Category[]>();
  console.log("UseState");
  const [expense, setExpense] = useState<Expense>({
    expenseId: null,
    name: "",
    date: formatISODate(new Date()),
    bagId: null,
    bag: null,
    categoryId: null,
    category: null,
    amount: 0,
    price: null,
    value: null,
    deductions: null,
    additions: null,
    cost: null,
    comment: null,
  });

  function formatISODate(date: Date | null): string {
    if (date == null) {
      return "";
    } else {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  useEffect(() => {
    const getExpense = async () => {
      let data = await api.getExpense(Number(expenseId));
      if (data != null) {
        setExpense(data);
        console.log("setExpense data", data);
      }
    };
    getExpense();
  }, [expenseId]);

  useEffect(() => {
    const getCategories = async () => {
      if (expense.bagId != null) {
        const data = await api.getCategories(expense.bagId);
        setCategories(data);
        if (expense.expenseId == null) {
          setExpense({ ...expense, categoryId: data[0].categoryId } as Expense);
        }
      }
    };
    getCategories();
  }, [expense.bagId]);

  useEffect(() => {
    const getBags = async () => {
      const data = await api.getBags();
      if (expense.expenseId == null) {
        setExpense({ ...expense, bagId: data[0].bagId } as Expense);
      }
      setBags(data);
    };

    getBags();
  }, []);

  const add = async () => {
    var r = await api.saveExpense(expense);
    navigate("/Expenses?bagId=" + expense.bagId + "&categoryId=" + expense.categoryId);
  };

  const updateStringValue = (e: any) => {
    setExpense({ ...expense, [e.target.name]: e.target.value } as Expense);
  };

  const updateNumberValue = (e: any) => {
    setExpense({ ...expense, [e.target.name]: Number(e.target.value) } as Expense);
  };

  return (
    <div>
      <p>
        Name:{expense?.name} bagid: {expense?.bagId}, categoryId:{expense?.categoryId}, date:{String(expense?.date)},
        amount: {expense?.amount}, price: {expense?.price}, deductions:{expense?.deductions}, additions:{" "}
        {expense?.additions}, comment:{expense?.comment}
      </p>
      <p>
        Name
        <input type="text" name="name" value={expense.name || ""} onChange={updateStringValue}></input>
      </p>
      <p>
        Bag
        <select name="bagId" onChange={updateNumberValue}>
          {bags?.map((oneBag) => {
            return (
              <option key={oneBag.bagId} value={oneBag.bagId}>
                {oneBag.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        Category
        <select name="categoryId" onChange={updateNumberValue}>
          {categories?.map((category) => {
            return (
              <option key={category.categoryId} value={category.categoryId || -1}>
                {category.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        Date<input name="date" type="text" value={expense?.date || ""} onChange={updateStringValue}></input>
      </p>
      <p>
        Amount<input name="amount" type="text" onChange={updateNumberValue}></input>
      </p>
      <p>
        Price<input name="price" type="text" onChange={updateNumberValue}></input>
      </p>
      <p>
        Value<input type="text" disabled={true}></input>
      </p>
      <p>
        Deductions<input name="deductions" type="text" onChange={updateNumberValue}></input>
      </p>
      <p>
        Additions<input name="additions" type="text" onChange={updateNumberValue}></input>
      </p>
      <p>
        Cost<input type="text" disabled={true}></input>
      </p>
      <p>
        Comment<input name="comment" type="text" onChange={updateStringValue}></input>
      </p>
      <button onClick={add}>add</button>
    </div>
  );
}
