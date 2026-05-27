import axios from "axios";
import { useState } from "react";

export default function AddComplianceReport() {

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:9002/api/compliance-reports";

        // ✅ IMPORTANT FIX (wrapped object)
        const data = {
            complianceReport: {
                reportScope: scope,
                reportMetrics: metrics,
                reportGeneratedDate: date
            }
        };

        try {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            alert(response.data.message);

            // reset form
            setScope("");
            setMetrics("");
            setDate("");

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error adding report");
        }
    };

    return (
        <div>
            <h3>Add Compliance Report</h3>

            <form onSubmit={handleSubmit}>

                <label>Scope</label><br />
                <input value={scope} onChange={(e) => setScope(e.target.value)} required /><br />

                <label>Metrics</label><br />
                <input value={metrics} onChange={(e) => setMetrics(e.target.value)} required /><br />

                <label>Report Date</label><br />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /><br />

                <button type="submit">Save</button>

            </form>
        </div>
    );
}
