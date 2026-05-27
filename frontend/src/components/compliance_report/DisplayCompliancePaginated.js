import axios from "axios";
import { useState } from "react";

export default function DisplayCompliancePaginated() {

    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [sortBy, setSortBy] = useState("reportId");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/compliance-reports/paginated";

            const res = await axios.get(url, {
                params: {
                    page: page,
                    size: size,
                    sortBy: sortBy,
                    asc: asc
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(res.data);
            setRecords(res.data.content || []);

        } catch (err) {
            console.error(err.response?.data);
            alert(err.response?.data || err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Paginated Compliance Reports</h2>

            {/* Page No */}
            <div className="mb-3">
                <label className="form-label">Enter Page No</label>
                <input
                    type="number"
                    className="form-control"
                    defaultValue={0}
                    onChange={e => setPage(Number(e.target.value))}
                />
            </div>

            {/* Page Size */}
            <div className="mb-3">
                <label className="form-label">Enter Page Size</label>
                <input
                    type="number"
                    className="form-control"
                    defaultValue={3}
                    onChange={e => setSize(Number(e.target.value))}
                />
            </div>

            {/* Sorting */}
            <div className="mb-3">
                <label className="form-label">Select Sorting Column</label>
                <select
                    className="form-select"
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="reportId">Report Id</option>
                    <option value="reportScope">Report Scope</option>
                    <option value="reportMetrics">Report Metrics</option>
                    <option value="reportGeneratedDate">Generated Date</option>
                </select>
            </div>

            {/* Order */}
            <div className="mb-3">
                <label className="form-label">Order</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="order"
                            checked={asc === true}
                            onChange={() => setAsc(true)}
                        />
                        <label className="form-check-label">Ascending</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="order"
                            checked={asc === false}
                            onChange={() => setAsc(false)}
                        />
                        <label className="form-check-label">Descending</label>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary" onClick={buttonHandler}>
                Get Reports
            </button>

            {/* Table */}
            {records.length === 0 ? (
                <div className="alert alert-warning mt-3">
                    No Data Found
                </div>
            ) : (
                <table className="table table-bordered table-striped mt-4">
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