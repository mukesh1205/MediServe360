import { useState } from "react";
import axios from "axios";

export default function FindCompliance() {

    const [scope, setScope] = useState("");
    const [records, setRecords] = useState([]);

    const scopeHandler = (e) => {
        setScope(e.target.value);
    };

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/fetchAllComplianceReports";
            const res = await axios.get(url);

            let reports = res.data;

            // ✅ Filter manually on frontend
            if (scope.trim()) {
                reports = reports.filter((r) =>
                    r.reportScope.toLowerCase().includes(scope.toLowerCase())
                );
            }

            if (reports.length === 0) {
                alert("No Report Found");
            }

            setRecords(reports);

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    return(
        <div>
            <h1>This is Find Compliance component</h1>

            <label>Enter Scope</label>
            <input type="text" onChange={scopeHandler}/>
            <br />

            <button onClick={buttonHandler}>Find</button>

            {records.length > 0 && (
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Scope</th>
                                <th>Metrics</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((e) => {
                                return(
                                    <tr key={e.reportId}>
                                        <td>{e.reportId}</td>
                                        <td>{e.reportScope}</td>
                                        <td>{e.reportMetrics}</td>
                                        <td>{e.reportGeneratedDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}