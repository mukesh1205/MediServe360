import axios from "axios";
import { useState } from "react";

export default function AddKPIReport(){

    let [scope, setScope] = useState("");
    let [metrics, setMetrics] = useState("");
    let [date, setDate] = useState("");
    let [complianceId, setComplianceId] = useState("");

    let scopeHandler = (event) => {
        setScope(event.target.value);
    };

    let metricsHandler = (event) => {
        setMetrics(event.target.value);
    };

    let dateHandler = (event) => {
        setDate(event.target.value);
    };

    let complianceIdHandler = (event) => {
        setComplianceId(event.target.value);
    };

    let buttonHandler = () => {

        let url = "http://localhost:9002/api/addKPIReport";

        let data = {
            "kpiReport": {
                "kpiReportScope": scope,
                "kpiMetrics": metrics,
                "kpiGeneratedDate": date,
                "complianceReport": {
                    "reportId": complianceId
                }
            }
        };

        axios.post(url, data)
            .then((response) => {
                alert("KPI Report Saved successfully " + response.data);
            })
            .catch((error) => {
                console.error(error.response?.data || error);
            });
    };

    return(
        <div>
            <h3>Add KPI Report</h3>

            <label>Scope</label>
            <input type="text" onChange={scopeHandler} required />
            <br />

            <label>Metrics</label>
            <input type="text" onChange={metricsHandler} required />
            <br />

            <label>Date</label>
            <input type="date" onChange={dateHandler} required />
            <br />

            <label>Compliance Report ID</label>
            <input type="number" onChange={complianceIdHandler} required />
            <br />

            <button onClick={buttonHandler}>Add KPI Report</button>
        </div>
    );
}