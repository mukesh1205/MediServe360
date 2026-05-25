import axios from "axios";
import { useState } from "react";

export default function DisplayCompliancePaginated(){

    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/compliance-reports";

            const params = {
                params: {
                    page: page,
                    size: size,
                    sortBy: sortBy,
                    asc: asc
                }
            };

            const res = await axios.get(url, params);

            setRecords(res.data.content);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>

            <label>Enter Page NO</label>
            <input type="number" onChange={e => setPage(Number(e.target.value))}/>
            <br />

            <label>Enter size of Page</label>
            <input type="number" onChange={e => setSize(Number(e.target.value))}/>
            <br />

            <label>Select sorting column</label>
            <select onChange={e => setSortBy(e.target.value)}>
                <option value="">--Select Column--</option>
                <option value="reportId">Report Id</option>
                <option value="reportScope">Report Scope</option>
                <option value="reportMetrics">Report Metrics</option>
                <option value="reportGeneratedDate">Generated Date</option>
            </select>
            <br />

            <label>Order</label>

            <input
                type="radio"
                name="sortOrder"
                value="true"
                checked={asc === true}
                onChange={() => setAsc(true)}
            />
            <label>Ascending</label>

            <input
                type="radio"
                name="sortOrder"
                value="false"
                checked={asc === false}
                onChange={() => setAsc(false)}
            />
            <label>Descending</label>
            <br />

            <button onClick={buttonHandler}>Get Reports</button>

            {records.length > 0 && (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Scope</th>
                            <th>Metrics</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map((e) => {
                                return (
                                    <tr key={e.reportId}>
                                        <td>{e.reportId}</td>
                                        <td>{e.reportScope}</td>
                                        <td>{e.reportMetrics}</td>
                                        <td>{e.reportGeneratedDate}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            )}

        </div>
    );
}