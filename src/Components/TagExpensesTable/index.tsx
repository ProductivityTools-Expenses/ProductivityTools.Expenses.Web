import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";
import { logout } from "../../Session/firebase";
import { useSearchParams } from "react-router-dom"

export function TagExpensesTable() {

    const [searchParams, setSearchParams] = useSearchParams();

    const tagId: number = Number(searchParams.get('tagId'));

    return (
        <div>
            <span>{tagId}</span>
            <table>
                <tr >
                </tr>
                <tr>

                </tr>

            </table>
            home
        </div>
    );
}
