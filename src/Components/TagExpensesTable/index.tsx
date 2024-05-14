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
                        <td>{x.valueSum.toLocaleString().replace(","," ")}</td>
                    </tr>
                )}

            </table>
            home
        </div >
    );
}
