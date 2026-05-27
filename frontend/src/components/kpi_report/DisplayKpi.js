import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ correct import

export default function DisplayKpi() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("❌ Please login first");
                    return;
                }

                let url = "http://localhost:9002/api/kpi_report";

                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                console.log("✅ KPI Data:", res.data);
                setRecords(res.data);

            } catch (err) {
                console.error(err);
                alert(err.response?.data || "Error fetching KPI reports");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    // ✅ Loading state
    if (loading) {
        return <h3>Loading...</h3>;
    }

    return (
        <div>
            <h3>This is Display KPI Report</h3>

            {records.length === 0 ? (
                <p>No Data Found</p>
            ) : (
                <table border="1" cellPadding="8">
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