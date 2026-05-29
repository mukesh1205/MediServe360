import { useEffect, useState } from "react";
import axios from "axios";

export default function DisplayKpi() {

    const [records, setRecords] = useState([]);

    useEffect(() => {

        let url = "http://localhost:9002/api/kpi-report/fetchAllKPIReports";

        axios.get(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res) => {
            console.log(res.data); //
            setRecords(res.data);
        })
        .catch((err) => {
            console.error(err);
        });

    }, []);

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
                                    {e.complianceReport?.reportId || 
                                     e.complianceReport?.id || 
                                     "N/A"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}