import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";
import { logout } from "../../Session/firebase";
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import * as api from '../../Services/apiService'
import TagsSummary from '../../Objects/TagsSummary'

export function TagExpensesTable() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [tagsSummary, setTagsSummary] = useState<TagsSummary[]>([]);
    const [tagGroupName, setTagGroupName] = useState<string>();

    const tagId: number = Number(searchParams.get('tagId'));

    useEffect(() => {
        const fetchData = async () => {
            var r = await api.getTagsSummary(tagId);
            r.sort((a: TagsSummary, b: TagsSummary) => b.valueSum - a.valueSum);
            setTagsSummary(r);
        }
        fetchData();
    }, [tagId])

    useEffect(() => {
        const fetchData = async () => {
            var r = await api.getTagGroup(tagId);
            console.log("SetTagGroupName", r)
            setTagGroupName(r.name);
        }
        fetchData();
    }, [tagId])


    const loadExpenses = () => {
        api.getExpensesByTag(1);
    }

    return (
        <div>
            <span>Tag Id: {tagId}</span><br />
            <span>Tag group name : {tagGroupName}</span>
            <table>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Valuesum
                    </th>
                </tr>
                {tagsSummary.map(x =>
                    <tr key={x.tagName} >
                        <td>{x.tagName}</td>
                        <td align="right"><button onClick={loadExpenses}>{x.valueSum.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(",", " ")}</button></td>
                    </tr>
                )}

            </table>
            ExpensesDeails:
            {/* <Table expenses={expensesGrouped[x]} deleteExpense={deleteExpense} editExpense={editExpense}></Table> */}

        </div >
    );
}
