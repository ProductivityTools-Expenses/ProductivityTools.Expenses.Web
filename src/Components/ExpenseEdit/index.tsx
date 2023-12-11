import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import Expense from "../../Objects/Expense";

export function ExpenseEdit() {
  const [bags, setBags] = useState<Bag[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [expense, setExpense] = useState<Expense>({
    expenseId: null,
    name: "",
    date: null,
    bagId: null,
    bag: null,
    categoryId: null,
    category: null,
    value: 0,
    free: false,
    comment: "",
    discount: 0,
  });

  useEffect(() => {
    const getBags = async () => {
      const data = await api.getBags();
      setBags(data);
    };

    const getCategories = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };

    getBags();
    getCategories();
  }, []);

  const add = async () => {
    var r = await api.saveExpense(expense);
  };

  const updateStringValue=(e :any)=>{
    setExpense({...expense,[e.target.name]:e.target.value} as Expense)
  } 

  const updateNumberValue=(e :any)=>{
    setExpense({...expense,[e.target.name]:Number(e.target.value)} as Expense)
  } 

  return (
    <div>
      <p>
        debug:{expense?.name} bagid: {expense?.bagId}, categoryId:{expense?.categoryId}, date:{String(expense?.date)}
      </p>
      <p>
        Name
        <input type="text" name="name" onChange={updateStringValue}></input>
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
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        Date<input name="date" type="text" onChange={updateStringValue}></input>
      </p>
      <p>
        Currency<select></select>
      </p>
      <p>
        Value<input type="text"></input>
      </p>
      <p>
        Discount<input type="text"></input>
      </p>
      <p>
        Free<input type="text"></input>
      </p>
      <p>
        Comment<input type="text"></input>
      </p>
      <button onClick={add}>add</button>
    </div>
  );
}
