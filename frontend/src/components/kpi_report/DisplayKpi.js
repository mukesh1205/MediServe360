import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function DisplayKPIReport(){

    const [records, setRecords] = useState([]);

    useEffect(() => {

        let url = "http://localhost:9002/api/kpi-reports/fetchAllKPIReports";

        axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
        .then((res) => {
            setRecords(res.data);
        })
        .catch((err) => {
            console.error(err);
        });

    }, []);

    return(
        <div>
            <h3>This is Display KPI Report</h3>

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
                            records.map((e) => {
                                return(
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
                                );
                            })
                        }
                    </tbody>
                </table>
            )}
        </div>
    );
}