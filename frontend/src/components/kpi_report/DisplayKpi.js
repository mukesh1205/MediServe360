import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

                let url = "http://localhost:9002/api/kpi-report/fetchAllKPIReports";

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

    // ✅ Bootstrap loading
    if (loading) {
        return (
            <div className="container mt-4">
                <h4>Loading...</h4>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>KPI Reports</h2>

            {records.length === 0 ? (
                <div className="alert alert-warning mt-3">
                    No Data Found
                </div>
            ) : (
                <table className="table table-bordered table-striped mt-3">
                    <thead className="table-dark">
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
