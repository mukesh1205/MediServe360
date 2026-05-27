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

    const buttonHandler = async () => {

        const url = "http://localhost:9002/api/kpi-report/addKPIReport";

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

            // reset form
            setScope("");
            setMetrics("");
            setDate("");
            setComplianceId("");

        } catch (error) {
            console.error(error);
            alert(error.response?.data || "❌ Error occurred");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add KPI Report</h2>

            <div className="mb-3">
                <label className="form-label">Scope</label>
                <input
                    type="text"
                    className="form-control"
                    value={scope}
                    onChange={scopeHandler}
                    placeholder="Enter scope"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Metrics</label>
                <input
                    type="text"
                    className="form-control"
                    value={metrics}
                    onChange={metricsHandler}
                    placeholder="Enter metrics"
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={dateHandler}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Compliance Report ID</label>
                <input
                    type="number"
                    className="form-control"
                    value={complianceId}
                    onChange={complianceIdHandler}
                    placeholder="Enter report ID"
                    required
                />
            </div>

            <button className="btn btn-primary" onClick={buttonHandler}>
                Add KPI Report
            </button>
        </div>
    );
}