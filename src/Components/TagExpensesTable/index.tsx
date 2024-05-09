import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";
import { logout } from "../../Session/firebase";
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react";
import * as api from '../../Services/apiService'

export function TagExpensesTable() {

    const [searchParams, setSearchParams] = useSearchParams();

    const tagId: number = Number(searchParams.get('tagId'));

    useEffect(() => {
        const fetchData = () => {
            api.getTagsSummary(1);
        }
        fetchData();
    }, [tagId])
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
