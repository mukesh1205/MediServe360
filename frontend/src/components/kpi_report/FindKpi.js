import { useState } from "react";
import axios from "axios";

export default function FindKpi() {

    const [scope, setScope] = useState("");
    const [records, setRecords] = useState([]);

    const scopeHandler = (e) => {
        setScope(e.target.value);
    };

    const buttonHandler = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("❌ Please login first");
                return;
            }

            let url = "http://localhost:9002/api/kpi_report";

            let res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            let kpis = res.data;

            // ✅ Same filtering like compliance
            if (scope.trim()) {
                kpis = kpis.filter((e) =>
                    e.kpiReportScope.toLowerCase().includes(scope.toLowerCase())
                );
            }

            if (kpis.length === 0) {
                alert("No KPI Found");
            }

            setRecords(kpis);

        } catch (err) {
            console.error(err);
            alert(err.response?.data || "Something went wrong");
        }
    };

    return (
        <div>
            <h1>This is Find KPI Component</h1>

            <label>Enter Scope</label>
            <input type="text" onChange={scopeHandler} />
            <br />

            <button onClick={buttonHandler}>Find</button>

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
                        {records.map((e) => (
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
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}