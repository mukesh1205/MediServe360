import axios from "axios";
import { useState } from "react";

export default function DisplayCompliancePaginated(){

    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3); // ✅ FIXED
    const [sortBy, setSortBy] = useState("reportId"); // ✅ FIXED
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/compliance-reports/paginated";

            const res = await axios.get(url, {
                params: {
                    page: page,
                    size: size,
                    sortBy: sortBy,
                    asc: asc
                },
                headers: {   // ✅ FIXED
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(res.data);

            setRecords(res.data.content || []);

        } catch (err) {
            console.error(err.response?.data);
            alert(err.response?.data || err.message);
        }
    };

    return (
        <div>

            <h2>Paginated Compliance Reports</h2>

            <label>Enter Page No</label>
            <input
                type="number"
                defaultValue={0}
                onChange={e => setPage(Number(e.target.value))}
            />
            <br />

            <label>Enter size of Page</label>
            <input
                type="number"
                defaultValue={3}
                onChange={e => setSize(Number(e.target.value))}
            />
            <br />

            <label>Select sorting column</label>
            <select onChange={e => setSortBy(e.target.value)}>
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
                checked={asc === true}
                onChange={() => setAsc(true)}
            />
            <label>Ascending</label>

            <input
                type="radio"
                name="sortOrder"
                checked={asc === false}
                onChange={() => setAsc(false)}
            />
            <label>Descending</label>
            <br />

            <button onClick={buttonHandler}>Get Reports</button>

            {records.length === 0 ? (
                <p>No Data Found</p>
            ) : (
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
                        {records.map((e) => (
                            <tr key={e.reportId}>
                                <td>{e.reportId}</td>
                                <td>{e.reportScope}</td>
                                <td>{e.reportMetrics}</td>
                                <td>{e.reportGeneratedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}