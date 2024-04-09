
import Expense from "../../Objects/Expense";

interface Props {
    expenses: Expense[] | undefined,
    deleteExpense: (expenseId: number) => void,
    editExpense: (expenseId: number) => void,
}

export default function Table({ expenses, deleteExpense, editExpense }: Props) {

    return (
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
    );
}
