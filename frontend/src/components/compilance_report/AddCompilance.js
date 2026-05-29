import axios from "axios";
import { useState } from "react";

export default function AddComplianceReport() {

    let [scope, setScope] = useState("");
    let [metrics, setMetrics] = useState("");
    let [date, setDate] = useState("");

    let scopeHandler = (event) => {
        setScope(event.target.value);
    };

    let metricsHandler = (event) => {
        setMetrics(event.target.value);
    };

    let dateHandler = (event) => {
        setDate(event.target.value);
    };

    let buttonHandler = () => {
        let url = "http://localhost:9002/api/compliance-reports/addComplianceReport";

        let data = {
            "complianceReport": {
                "reportScope": scope,
                "reportMetrics": metrics,
                "reportGeneratedDate": date
            }
        };

        axios.post(url, data,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((response) => {
                alert("Compliance Report Saved successfully " + response.data);
            })
            .catch((error) => {
                console.error(error.response?.data || error);
            });
    };

    return (
        <div>
            <h3>Add Compliance Report</h3>

            <label>Scope</label>
            <input type="text" onChange={scopeHandler} required />
            <br />

            <label>Metrics</label>
            <input type="text" onChange={metricsHandler} required />
            <br />

            <label>Date</label>
            <input type="date" onChange={dateHandler} required />
            <br />

            <button onClick={buttonHandler}>Save</button>
        </div>
    );
}