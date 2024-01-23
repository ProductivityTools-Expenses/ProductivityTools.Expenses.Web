import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Expense from "../../Objects/Expense";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import { debug } from "console";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useQuery from "../../Tools/NavigationExtensions";

export function ExpensesTable() {
  let query = useQuery();
  let navigate = useNavigate();
  const [expenses, setExpenses] = useState<Expense[]>();
  const [bags, setBags] = useState<Bag[]>();
  const [categories, setCategories] = useState<Category[]>();
  // const [selectedBag, setSelectedBag] = useState<number | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [forceRefreshCoutner, setForceRefreshCounter] = useState<number>(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const qBagId = Number(searchParams.get("bagId"));
  const qCategoryId = Number(searchParams.get("categoryId"));

  useEffect(() => {
    const fetchData = async () => {
      // if (qBagId != null) {
      //   setSelectedBag(qBagId);
      // }
      // if (qCategoryId != null) {
      //   setSelectedCategory(qCategoryId);
      // }
      const data = await api.getExpenses(qBagId, qCategoryId);
      setExpenses(data);
    };
    fetchData();
  }, [qBagId, qCategoryId, forceRefreshCoutner]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.bagsGet();
      setBags(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (qBagId != null) {
        const data = await api.getCategories(qBagId);
        setCategories(data);
      }
    };
    fetchData();
  }, [qBagId]);

  const deleteExpense = (expenseId: number) => {
    console.log(expenseId);
    api.deleteExpense(expenseId);
    setForceRefreshCounter(forceRefreshCoutner + 1);
  };
  const editExpense = (expenseId: number) => {
    console.log(expenseId);
    navigate("/ExpenseEdit/" + expenseId);
  };

  return (
    <div>
      <div>query:{query.get("bagId")}</div>
      <Link to="/">Home</Link>
      <span>
        {" "}
        selectedBag: {qBagId} selectedCategory:{qCategoryId}
      </span>
      <br />
      <select
        name="bags"
        value={qBagId?.toString()}
        onChange={(e) => {
          setSearchParams((params) => {
            params.set("bagId", JSON.parse(e.target.value));
            return params;
          });

          console.log("xx");
        }}
      >
        {bags?.map((x: Bag) => (
          <option key={x.bagId} value={x.bagId!}>
            {x.name}
          </option>
        ))}
      </select>
      <select
        name="categories"
        value={qCategoryId?.toString()}
        onChange={(e) => {
          setSearchParams((params) => {
            params.set("categoryId", JSON.parse(e.target.value));
            return params;
          });
          console.log("fdsaf");
        }}
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
            <th>Action</th>
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
                  <td>{x.amount}</td>
                  <td>{x.price}</td>
                  <td>{x.value}</td>
                  <td>{x.additions}</td>
                  <td>{x.deductions}</td>
                  <td>{x.cost}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        deleteExpense(x.expenseId!);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        editExpense(x.expenseId!);
                      }}
                    >
                      edit
                    </button>
                  </td>
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
