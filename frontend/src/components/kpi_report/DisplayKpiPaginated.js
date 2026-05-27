import axios from "axios";
import { useState } from "react";

export default function DisplayKpiPaginated() {

    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(3);
    const [sortBy, setSortBy] = useState("kpiId");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("❌ Please login first");
                return;
            }

            if (size <= 0) {
                alert("Size must be greater than 0");
                return;
            }

            const url = "http://localhost:9002/api/kpi-report/fetchAllKPIReports/paginated";

            const res = await axios.get(url, {
                params: {
                    page: page,
                    size: size,
                    sortBy: sortBy,
                    asc: asc
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            console.log("✅ KPI Paginated Data:", res.data);
            setRecords(res.data.content || []);

        } catch (err) {
            console.error(err);
            alert(err.response?.data || "Error fetching KPI reports");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Paginated KPI Reports</h2>

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
                    <option value="kpiId">KPI ID</option>
                    <option value="kpiReportScope">Scope</option>
                    <option value="kpiMetrics">Metrics</option>
                    <option value="kpiGeneratedDate">Date</option>
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
                Get KPI Reports
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
                            <th>KPI ID</th>
                            <th>Scope</th>
                            <th>Metrics</th>
                            <th>Date</th>
                            <th>Compliance Report ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((e) => (
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
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}