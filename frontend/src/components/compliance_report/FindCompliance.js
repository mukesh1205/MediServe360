import { useState } from "react";
import axios from "axios";

export default function FindCompliance() {

    const [scope, setScope] = useState("");
    const [records, setRecords] = useState([]);
    const [error, setError] = useState("");

    const scopeHandler = (e) => {
        setScope(e.target.value);
    };

    const buttonHandler = async () => {
        setError("");
        setRecords([]);

        try {
            const url = "http://localhost:9002/api/compliance-reports/fetchAllComplianceReports";

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            let reports = res.data;

            if (scope.trim()) {
                reports = reports.filter((r) =>
                    r.reportScope.toLowerCase().includes(scope.toLowerCase())
                );
            }

            if (reports.length === 0) {
                setError("No Report Found");
            }

            setRecords(reports);

        } catch (err) {
            console.log(err.response?.data);
            setError(err.response?.data || err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Find Compliance Report</h2>

            <div className="input-group mb-3">
                <input
                    className="form-control"
                    placeholder="Enter Scope"
                    value={scope}
                    onChange={scopeHandler}
                />
                <button className="btn btn-primary" onClick={buttonHandler}>
                    Search
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {records.length > 0 && (
                <table className="table table-bordered table-striped mt-3">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Scope</th>
                            <th>Metrics</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((e) => (
                            <tr key={e.reportId}>
                                <td>{e.reportId}</td>
                                <td>{e.reportScope}</td>
                                <td>{e.reportMetrics}</td>
                                <td>{e.reportGeneratedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}