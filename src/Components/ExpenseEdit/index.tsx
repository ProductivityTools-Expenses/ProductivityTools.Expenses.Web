import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import Expense from "../../Objects/Expense";
import ExpenseTag from "../../Objects/ExpenseTag";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { debug } from "console";

export function ExpenseEdit() {
  let { expenseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("expenseid param:", expenseId);

  let navigate = useNavigate();
  const [bags, setBags] = useState<Bag[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [tags, setTags] = useState<ExpenseTag[]>([]);

  const [expense, setExpense] = useState<Expense>({
    expenseId: null,
    name: "xx",
    date: formatISODate(new Date()),
    bagId: null,
    bag: null,
    categoryId: null,
    category: null,
    amount: 0,
    price: 0,
    priceString: "0",
    value: null,
    deductions: 0,
    deductionsString: "0",
    additions: 0,
    additionsString: "0",
    cost: null,
    comment: null,
    tags: null
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
    if (expenseId != null) {
      getExpense();
    }
  }, [expenseId]);

  useEffect(() => {
    console.log("useEffect getCategories bagId:", expense.bagId)
    console.log("useEffect getCategories categoryId:", expense.categoryId)
    const getCategories = async () => {
      if (expense.bagId != null) {
        const data = await api.getCategories(expense.bagId);
        setCategories(data);
        if (expense.expenseId == null && expenseId == null) {
          setExpense({ ...expense, categoryId: data[0].categoryId } as Expense);
        }

        const categoryId: number = Number(searchParams.get('categoryId'));
        if (categoryId != undefined) {
          setExpense({ ...expense, categoryId: categoryId } as Expense);
        }
      }
    };
    getCategories();
  }, [expense.bagId]);

  useEffect(() => {

    const getBags = async () => {
      console.log("getBags")
      const data = await api.bagsGet();
      if (expense.expenseId == null && expenseId == null) {
        console.log("expense.expenseId == null && expenseId == null", data[0].bagId)
        setExpense({ ...expense, bagId: data[0].bagId } as Expense);
        //setExpense({ ...expense, bagId: 5 } as Expense);
      }
      console.log("SearchParams", searchParams.get('bagId'))
      if (searchParams.get('bagId') != undefined) {
        const bagId: number = Number(searchParams.get('bagId'));

        //this should no be called for edit
        console.log("bagId != undefined", bagId)
        setExpense({ ...expense, bagId: bagId } as Expense);
        //setExpense({ ...expense, bagId: 4 } as Expense);

      }
      setBags(data);
    };

    getBags();
  }, []);

  useEffect(() => {
    const getTags = async () => {
      const data = await api.getTags([Number(expenseId)])
      setTags(data);
      console.log("Tags", data);
    }
    getTags();
  }, [])

  const save = async () => {
    var r = await api.saveExpense(expense);
    var r2 = await api.saveTags(tags);
    navigate("/Expenses?bagId=" + expense.bagId + "&categoryId=" + expense.categoryId);
  };

  const updateStringValue = (e: any) => {
    setExpense({ ...expense, [e.target.name]: e.target.value } as Expense);
  };

  const updateNumberValue = (e: any) => {
    console.log("numbervalue", e.target.value);
    let valueString: string = e.target.value;
    let valueFloat = parseFloat(valueString.replace(",", "."));

    let stringName: string = e.target.name;
    let name: string = stringName.replace("String", "");
    setExpense({ ...expense, [name]: valueFloat, [stringName]: valueString } as Expense);
  };

  const removeTag = (expenseTagId: number | null) => {
    if (expenseTagId) {
      var result=api.removeTagFromExpense(expenseTagId);
      let newTags: ExpenseTag[] = [...tags]
      newTags = newTags.filter(x => x.expenseTagId != expenseTagId);
      setTags(newTags);
    }
  }

  return (
    <div>
      <p>
        Name:{expense?.name} bagid: {expense?.bagId}, categoryId:{expense?.categoryId}, date:{String(expense?.date)},
        amount: {expense?.amount}, price: {expense?.price}, priceString:{expense?.priceString} deductions:{expense?.deductions}, additions:{" "}
        {expense?.additions}, comment:{expense?.comment}
      </p>
      <p>
        Name
        <input type="text" name="name" value={expense.name || ""} onChange={updateStringValue}></input>
      </p>
      <p>
        Bag
        <select name="bagId" value={expense.bagId || -1} onChange={updateNumberValue}>
          {bags?.map((oneBag) => {
            return (
              <option key={oneBag.bagId} value={oneBag.bagId!}>
                {oneBag.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        Category
        <select name="categoryId" value={expense.categoryId || -1} onChange={updateNumberValue}>
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
        Amount<input name="amountString" type="text" value={expense.amount || 0} onChange={updateNumberValue}></input>
      </p>
      <p>
        Price
        <input name="priceString" type="text" value={expense.priceString || ""} onChange={updateNumberValue}></input>
      </p>
      <p>
        Value<input type="text" disabled={true}></input>
      </p>
      <p>
        Deductions
        <input
          name="deductionsString"
          type="text"
          value={expense.deductionsString || ""}
          onChange={updateNumberValue}
        ></input>
      </p>
      <p>
        Additions
        <input
          name="additionsString"
          type="text"
          value={expense.additionsString || ""}
          onChange={updateNumberValue}
        ></input>
      </p>
      <p>
        Cost<input type="text" disabled={true}></input>
      </p>
      <p>
        Comment<input name="comment" type="text" value={expense.comment || ""} onChange={updateStringValue}></input>
      </p>
      <span>Tags: {tags && tags.map(x => {
        return (<span>{x.tag.name} <button onClick={() => removeTag(x.expenseTagId)}>delete</button> |</span>)
      })}</span>
      <hr></hr>
      <button onClick={save}>Save</button>
      <button
        onClick={() => {
          navigate("/Expenses");
        }}
      >
        Cancel
      </button>
    </div>
  );
}
