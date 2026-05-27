import axios from "axios";
import { useState } from "react";

export default function PaginatedBed() {

    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [size, setSize] = useState(0);
    const [sorting, setSorting] = useState("");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/bed/getAllPatientsPaginated";
            const params = {
                params: {
                    pgno: pgno,
                    size: size,
                    sorting: sorting,
                    asc: asc
                }
            }
            const res = await axios.get(url, params);
            setRecords(res.data.content);
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="container mt-4">
            <h2>Paginated Beds</h2>

            <div className="mb-3">
                <label className="form-label">Enter Page NO</label>
                <input className="form-control" type="number" onChange={e => setPgno(Number(e.target.value))} />
            </div>

            <div className="mb-3">
                <label className="form-label">Enter Size of Page</label>
                <input className="form-control" type="number" onChange={e => setSize(Number(e.target.value))} />
            </div>

            <div className="mb-3">
                <label className="form-label">Select Sorting Column</label>
                <select className="form-select" onChange={e => setSorting(e.target.value)}>
                    <option value="">--Select Column--</option>
                    <option value="bedId">Bed Id</option>
                    <option value="bedStatus">Bed Status</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Order</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="sortOrder"
                            value="true"
                            checked={asc === true}
                            onChange={() => setAsc(true)}
                        />
                        <label className="form-check-label">Ascending</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="sortOrder"
                            value="false"
                            checked={asc === false}
                            onChange={() => setAsc(false)}
                        />
                        <label className="form-check-label">Descending</label>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary" onClick={buttonHandler}>Get Beds</button>

            {records.length > 0 && (
                <table className="table table-bordered table-striped mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>Bed Id</th>
                            <th>Bed Status</th>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((e) => {
                            return (
                                <tr key={e.bedId}>
                                    <td>{e.bedId}</td>
                                    <td>{e.bedStatus}</td>
                                    <td>{e.patient ? e.patient.patientId : "Not Assigned"}</td>
                                    <td>{e.patient ? e.patient.patientName : "Not Assigned"}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
