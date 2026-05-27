import axios from "axios";
import { useState } from "react";

export default function AddComplianceReport() {

    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:9002/api/compliance-reports/addComplianceReport";

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
        <div className="container mt-4">
            <h2>Add Compliance Report</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Scope</label>
                    <input
                        className="form-control"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        placeholder="Enter scope"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Metrics</label>
                    <input
                        className="form-control"
                        value={metrics}
                        onChange={(e) => setMetrics(e.target.value)}
                        placeholder="Enter metrics"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Report Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Save
                </button>

            </form>
        </div>
    );
}