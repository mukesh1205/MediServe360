import axios from "axios";
import { useState } from "react";

export default function AddKpi() {

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");
    const [date, setDate] = useState("");
    const [complianceId, setComplianceId] = useState("");

    const scopeHandler = (event) => {
        setScope(event.target.value);
    };

    const metricsHandler = (event) => {
        setMetrics(event.target.value);
    };

    const dateHandler = (event) => {
        setDate(event.target.value);
    };

    const complianceIdHandler = (event) => {
        setComplianceId(event.target.value);
    };

    // ✅ FIXED HANDLER
    const buttonHandler = async () => {

        const url = "http://localhost:9002/api/kpi_report";

        const data = {
            kpiReport: {
                kpiReportScope: scope,
                kpiMetrics: metrics,
                kpiGeneratedDate: date,
                complianceReport: {
                    reportId: complianceId
                }
            }
        };

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("No token found. Please login first.");
                return;
            }

            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            console.log(response.data);
            alert("✅ KPI Report Saved successfully");

        } catch (error) {
            console.error(error);
            alert(error.response?.data || "❌ Error occurred");
        }
    };

    return (
        <div>
            <h3>Add KPI Report</h3>

            <label>Scope</label>
            <input type="text" value={scope} onChange={scopeHandler} required />
            <br />

            <label>Metrics</label>
            <input type="text" value={metrics} onChange={metricsHandler} required />
            <br />

            <label>Date</label>
            <input type="date" value={date} onChange={dateHandler} required />
            <br />

            <label>Compliance Report ID</label>
            <input type="number" value={complianceId} onChange={complianceIdHandler} required />
            <br />

            <button onClick={buttonHandler}>Add KPI Report</button>
        </div>
    );
}