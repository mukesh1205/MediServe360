import axios from "axios";
import { useState } from "react";
import {toast} from 'react-toastify';
export default function DisplayPatientsPaginated() {

    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState("");
    const [size, setSize] = useState("");
    const [sorting, setSorting] = useState("");
    const [asc, setAsc] = useState(true);
    const [searched, setSearched] = useState(false);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/fetchAllPatientsPaginated";

<<<<<<< HEAD
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
=======
    const buttonHandler=async()=>{
        try{
            const url="http://localhost:9002/api/patient/fetchAllPatientsPaginated";
            
            const res=await axios.get(url,{
            params: {
                    pgno:pgno,
                    size:size,
                    sorting:sorting,
                    asc:asc
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
                });
>>>>>>> 0757f92c8fbce6f86f6ca66c9a6abae730f3f4db
            setRecords(res.data.content);
            setSearched(true);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Display Patients Paginated</h3>

            <div className="mb-3">
                <label className="form-label">Page NO</label>
                <input
                    className="form-control"
                    type="number"
                    value={pgno}
                    placeholder="Enter page number"
                    onChange={e => setPgno(e.target.value === "" ? "" : Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Page Size</label>
                <input
                    className="form-control"
                    type="number"
                    value={size}
                    placeholder="Enter page size"
                    onChange={e => setSize(e.target.value === "" ? "" : Number(e.target.value))}
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
                    <option value="patientId">Patient Id</option>
                    <option value="patientName">Patient Name</option>
                    <option value="patientGender">Patient Gender</option>
                    <option value="patientDOB">Patient DOB</option>
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
                Get Patients
            </button>

            {searched && records.length === 0 && pgno !== "" && size !== "" && sorting !== "" && (
                <p className="mt-3">No patients found</p>
            )}

            {records.length > 0 && (
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>DOB</th>
                                <th>Gender</th>
                                <th>Phone Number</th>
                                <th>Medical History</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((e) => (
                                <tr key={e.patientId}>
                                    <td>{e.patientId}</td>
                                    <td>{e.patientName}</td>
                                    <td>{new Date(e.patientDOB).toLocaleDateString()}</td>
                                    <td>{e.patientGender}</td>
                                    <td>{e.patientPhoneNumber}</td>
                                    <td>{e.patientMedicalHistory}</td>
                                    <td>{e.patientStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}