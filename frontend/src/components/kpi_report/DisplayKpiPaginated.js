import axios from "axios";
import { useState } from "react";

export default function DisplayKpiPaginated(){

    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);   // ✅ default fixed
    const [sortBy, setSortBy] = useState("kpiId");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {

            if (size <= 0) {
                alert("Size must be greater than 0");
                return;
            }

            let url = "http://localhost:9002/api/kpi-reports/fetchAllKPIReports/paginated";

            let res = await axios.get(url, {
                params: {
                    page: page,
                    size: size,
                    sortBy: sortBy,
                    asc: asc
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }});
            

            console.log(res.data);  // ✅ debug

            setRecords(res.data.content);

        } catch (err) {
            console.error(err);
            alert("Error fetching KPI reports");
        }
    };

    return(
        <div>

            <label>Enter Page NO</label>
            <input type="number" onChange={e => setPage(Number(e.target.value))}/>
            <br />

            <label>Enter size of Page</label>
            <input type="number" onChange={e => setSize(Number(e.target.value))}/>
            <br />

            <label>Select sorting column</label>
            <select onChange={e => setSortBy(e.target.value)}>
                <option value="kpiId">KPI ID</option>
                <option value="kpiReportScope">Scope</option>
                <option value="kpiMetrics">Metrics</option>
                <option value="kpiGeneratedDate">Date</option>
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

            <button onClick={buttonHandler}>Get KPI Reports</button>

            {records.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>KPI ID</th>
                            <th>Scope</th>
                            <th>Metrics</th>
                            <th>Date</th>
                            <th>Compliance Report ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            records.map((e) => (
                                <tr key={e.kpiId}>
                                    <td>{e.kpiId}</td>
                                    <td>{e.kpiReportScope}</td>
                                    <td>{e.kpiMetrics}</td>
                                    <td>{e.kpiGeneratedDate}</td>
                                    <td>
                                        {e.complianceReport
                                            ? e.complianceReport.reportId
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}

        </div>
    );
}