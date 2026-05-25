import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function DisplayKPIReport() {
    const [kpis, setKpis] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9002/api/fetchAllKPIReports")
            .then((res) => {
                console.log("KPI Data:", res.data);
                setKpis(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h2>KPI Reports</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>KPI ID</th>
                        <th>Scope</th>
                        <th>Metrics</th>
                        <th>Date</th>
                        <th>Compliance Report ID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {kpis.map((k) => {
                        return (
                            <tr key={k.kpiId}>
                                <td>{k.kpiId}</td>
                                <td>{k.kpiReportScope}</td>
                                <td>{k.kpiMetrics}</td>
                                <td>{k.kpiGeneratedDate}</td>
                                <td>
                                    {k.complianceReport
                                        ? k.complianceReport.reportId
                                        : "N/A"}
                                </td>
                                <td>
                                    <Link to={"/kpi_report/update/" + k.kpiId}>Edit</Link>
                                </td>
                                <td>
                                    <Link to={"/kpi_report/delete/" + k.kpiId}>Delete</Link>
                                </td>
                            </tr>
                        )
                    }
                    )
                    }
                </tbody>
            </table>
        </div>
    );
}