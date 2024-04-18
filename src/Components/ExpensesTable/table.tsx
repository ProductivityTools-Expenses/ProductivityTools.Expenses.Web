
import Expense from "../../Objects/Expense";

interface Props {
    expenses: Expense[] | undefined,
    deleteExpense: (expenseId: number) => void,
    editExpense: (expenseId: number) => void,
}

export default function Table({ expenses, deleteExpense, editExpense }: Props) {

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
