import { ExpensesTable } from "../ExpensesTable";
import { Echo } from "../Echo";
import { logout } from "../../Session/firebase";
import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import * as api from '../../Services/apiService'
import TagsSummary from '../../Objects/TagsSummary'
import Expense from "../../Objects/Expense";
import Table from "../ExpensesTable/table";

export function TagExpensesTable() {

    let navigate = useNavigate();


    const [searchParams, setSearchParams] = useSearchParams();
    const [tagsSummary, setTagsSummary] = useState<TagsSummary[]>([]);
    const [tagGroupName, setTagGroupName] = useState<string>();
    const [expenses, setExpenses] = useState<Expense[]>()

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


    const loadExpenses = async (tagId: number) => {
        var r = await api.getExpensesByTag(tagId);
        setExpenses(r);
    }

    return (
        <div>
            <span>Tag Id: {tagId}</span><br />
            <span>Tag group name : {tagGroupName}</span>
            <button onClick={() => navigate(-1)}>Back</button>
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
                        <td align="right"><button onClick={() => loadExpenses(x.tagId)}>{x.valueSum.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace(",", " ")}</button></td>
                    </tr>
                )}
                <tr>
                    <td>sum</td>
                    <td>
                        <b>{tagsSummary
                            ?.reduce((accumualtor: number, object: TagsSummary) => {
                                return accumualtor + object!.valueSum!;
                            }, 0)
                            .toFixed(2)}</b>
                    </td>
                </tr>

            </table>
            ExpensesDeails:
            <Table expenses={expenses} showTags={false} refreshCallback={() => { }}></Table>

        </div >
    );
}
