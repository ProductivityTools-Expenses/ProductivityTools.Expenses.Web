
import { useEffect, useState } from "react";
import Expense from "../../Objects/Expense";

interface Props {
    expenses: Expense[] | undefined,
    deleteExpense: (expenseId: number) => void,
    editExpense: (expenseId: number) => void,
}
interface ISortedQuery {
    query: (a: Expense, b: Expense) => number;

}

export default function Table({ expenses, deleteExpense, editExpense }: Props) {

    //const [expensesGrouped, setExpensesGrouped] = useState<ExpenseGrouped>({});

    const [expensesSorted, setExpensesSorted] = useState<Expense[]>()
    const [sortedQuery, setSortedQuery] = useState<ISortedQuery>();
    const [ascending, setAscending] = useState<boolean>(true);

    useEffect(() => {
        if (expenses != undefined) {
            const data = [...expenses]
            console.log("data unsorted", data);
            console.log(sortedQuery)
            if (sortedQuery != null) {
                console.log("performing sorting")
                data?.sort(sortedQuery.query);
            }

            //data?.sort((a, b) => a.cost ?? 0 - (b.cost ?? 0));



            // data?.sort((a, b) => {
            //     if (a.cost != null && b.cost != null) {
            //         return a.cost - b.cost;
            //         // return sortedQuery?.query(a, b);
            //         //return -1;
            //     }
            //     else {
            //         return 0;
            //     }
            // })

            console.log("data sorted", data);
            setExpensesSorted(data);
        }
    }, [expenses, sortedQuery, ascending])

    function toJSONLocal(date: string | null) {
        if (date == null) {
            return ""
        }
        else {
            var local = new Date(date);
            local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
            return local.toJSON().slice(0, 10);
        }
    }

    const sortByCost = () => {
        if (ascending) {
            const query: ISortedQuery = {
                query: (a: Expense, b: Expense) => (a?.cost ?? 0) - (b?.cost ?? 0)
            }
            setSortedQuery(query)
            setAscending(false);
            console.log("ascending");
        }
        else {
            const query: ISortedQuery = {
                query: (a: Expense, b: Expense) => (b?.cost ?? 0) - (a?.cost ?? 0)
            }
            setSortedQuery(query)
            setAscending(true);
            console.log("descending")
        }

    }


    return (
        <table className="expensetable">
            <thead>
                <tr>
                    {/* <th>Bag</th>
                    <th>Category</th> */}
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Value</th>
                    <th>Additions</th>
                    <th>Deductions</th>
                    <th><button onClick={sortByCost}>Cost</button></th>
                    <th>Action</th>
                    {/* <th>Comment</th>             */}
                </tr>
            </thead>
            <tbody>
                {expensesSorted &&
                    expensesSorted.map((x: Expense) => {
                        return (
                            <tr key={x.expenseId}>
                                {/* <td className="bag">{x.bag?.name}</td>
                                <td className="categoryName">{x.category?.name}</td> */}
                                <td className="name">{x.name}</td>
                                <td className="date">{toJSONLocal(x.date)}</td>
                                <td className="amount">{x.amount}</td>
                                <td className="price">{x.price}</td>
                                <td className="value">{x.value}</td>
                                <td className="additions">{x.additions}</td>
                                <td className="deductions">{x.deductions}</td>
                                <td className="cost">{x.cost}</td>
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
                    {/* <td><b>Bag</b></td>
                    <td><b>Category</b></td> */}
                    <td><b>Name</b></td>
                    <td><b>Date</b></td>
                    <td><b>Amount</b></td>
                    <td><b>Price</b></td>
                    <td><b>Value</b></td>
                    <td><b>Additions</b></td>
                    <td><b>Deductions</b></td>
                    <td><b>
                        {" "}
                        {expenses
                            ?.reduce((accumualtor: number, object: Expense) => {
                                return accumualtor + object!.cost!;
                            }, 0)
                            .toFixed(2)}</b>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
