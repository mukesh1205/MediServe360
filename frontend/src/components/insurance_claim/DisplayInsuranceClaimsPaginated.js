import axios from "axios";
import { useState } from "react";
import {toast} from 'react-toastify';

export default function DisplayInsuranceClaimsPaginated() {

    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState("");
    const [size, setSize] = useState("");
    const [sorting, setSorting] = useState("");
    const [asc, setAsc] = useState(true);
    const [searched, setSearched] = useState(false);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/fetchAllInsuranceClaimsPaginated";

            if (pgno === "" || size === "" || sorting === "") {
                toast.warning("Please enter page number, size, and sorting column");
                return;
            }

            const params = {
                params: {
                    pgno: pgno,
                    size: size,
                    sorting: sorting,
                    asc: asc
                }
            };

            const res = await axios.get(url, params);
            setRecords(res.data.content);
            setSearched(true);

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Display Insurance Claims Paginated</h3>

            <div className="mb-3">
                <label className="form-label">Page No</label>
                <input
                    className="form-control"
                    type="number"
                    value={pgno}
                    placeholder="Enter page number"
                    onChange={e =>
                        setPgno(e.target.value === "" ? "" : Number(e.target.value))
                    }
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Page Size</label>
                <input
                    className="form-control"
                    type="number"
                    value={size}
                    placeholder="Enter page size"
                    onChange={e =>
                        setSize(e.target.value === "" ? "" : Number(e.target.value))
                    }
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Sorting column</label>
                <select
                    className="form-select"
                    value={sorting}
                    onChange={e => setSorting(e.target.value)}
                >
                    <option value="">--Select Column--</option>
                    <option value="insuranceClaimId">Claim Id</option>
                    <option value="policyNumber">Policy Number</option>
                    <option value="amount">Amount</option>
                    <option value="status">Status</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Order</label>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortOrder"
                        checked={asc === true}
                        onChange={() => setAsc(true)}
                    />
                    <label className="form-check-label">Ascending</label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortOrder"
                        checked={asc === false}
                        onChange={() => setAsc(false)}
                    />
                    <label className="form-check-label">Descending</label>
                </div>
            </div>

            <button
                className="btn btn-primary w-100"
                onClick={buttonHandler}
                disabled={pgno === "" || size === "" || sorting === ""}
            >
                Get Insurance Claims
            </button>

            {searched && records.length === 0 && (
                <p className="mt-3 text-danger">No insurance claims found</p>
            )}

            {records.length > 0 && (
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Claim Id</th>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                                <th>Policy Number</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {records.map((c) => (
                                <tr key={c.insuranceClaimId}>
                                    <td>{c.insuranceClaimId}</td>
                                    <td>{c.patient?.patientId}</td>
                                    <td>{c.patient?.patientName}</td>
                                    <td>{c.policyNumber}</td>
                                    <td>₹ {Number(c.amount).toFixed(2)}</td>
                                    <td>{c.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}