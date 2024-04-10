import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Expense from "../../Objects/Expense";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import { debug } from "console";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useQuery from "../../Tools/NavigationExtensions";
import Table from './table'

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
  const qCategoryId = searchParams.get("categoryId");

  // const groupBy = (expenses: Expense[]) => {
  //   var x = expenses.reduce((expense: Expense, x: expense[]) =>> {
  //     (expense[x["bagId"]] = expense[x["bagId"]] || []).push(x);
  //   return expense
  // }
  //}

  var groupBy = function (xs: Expense[], key: string) {
    return xs.reduce<Expense[]>((rv: Expense[], x: Expense) => {
      return rv;
    }, []);
  };

  var groupBy2 = function (xs: Expense[]) {
    var x = xs.reduce<{ [key: string]: Expense[] }>((result, current) => ({

      ...result,
      [current?.categoryId ?? -1]: [...(result[current?.categoryId ?? -1] || []), current]

    }), {})
    console.log("reduce", x);
    return x;
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchdataCategory", qCategoryId)
      console.log("fetchdataCategory without type", searchParams.get("categoryId"))
      const data = await api.getExpenses(qBagId, qCategoryId);
      var x = groupBy2(data)
      // console.log("groups", x)
      // console.log("data", data)
      // let grouped = data.reduce(
      //   (result: any, currentValue: any) => {
      //     (result[currentValue['categoryId']] = result[currentValue['categoryId']] || []).push(currentValue);
      //     return result;
      //   }, {});
      //console.log("grouped", grouped)

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

        let emptyCategory: Category = { categoryId: null, name: 'All' }
        data.unshift(emptyCategory);

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
            console.log("Oarams", params);
            params.delete('categoryId');
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
            console.log("category id selected value", e.target.value)
            if (e.target.value == "") {
              params.delete('categoryId');
            }
            else {
              params.set("categoryId", JSON.parse(e.target.value));
            }
            return params;
          });
          console.log("fdsaf");
        }}
      >
        {categories?.map((x: Category) => (
          <option key={x.categoryId} value={x.categoryId || ""}>
            {x.name}
          </option>
        ))}
      </select>
      <br />
      ExpensesTable:
      <Table expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense}></Table>

    </div>
  );
}
