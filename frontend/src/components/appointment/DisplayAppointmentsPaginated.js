// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function DisplayAppointmentsPaginated() {
//     const [records, setRecords] = useState([]);
//     const [pgno, setPgno] = useState(0);
//     const [size, setSize] = useState(5);
//     const [sorting, setSorting] = useState("id");
//     const [asc, setAsc] = useState(true);

//     const fetchAppointments = async () => {
//         try {
//             const url = "http://localhost:9002/api/appointments/getAllPaginated";
//             const res = await axios.get(url, {
//                 params: { pgno, size, sorting, asc }
//             });
//             setRecords(res.data.content);
//         } catch (err) {
//             alert(err.response?.data?.message || "Error fetching appointments");
//         }
//     };

//     useEffect(() => {
//         fetchAppointments();
//     }, [pgno, size, sorting, asc]);

//     return (
//         <div>
//             <h2>Appointments (Paginated)</h2>

//             <label>Page No</label>
//             <input type="number" value={pgno} onChange={e => setPgno(Number(e.target.value))} /><br />

//             <label>Page Size</label>
//             <input type="number" value={size} onChange={e => setSize(Number(e.target.value))} /><br />

//             <label>Sort By</label>
//             <select value={sorting} onChange={e => setSorting(e.target.value)}>
//                 <option value="id">Appointment Id</option>
//                 <option value="date">Date</option>
//                 <option value="time">Time</option>
//                 <option value="status">Status</option>
//             </select><br />

//             <label>Order</label>
//             <input type="radio" checked={asc} onChange={() => setAsc(true)} /> Ascending
//             <input type="radio" checked={!asc} onChange={() => setAsc(false)} /> Descending<br />

//             {records.length > 0 && (
//                 <table border={1}>
//                     <thead>
//                         <tr>
//                             <th>Id</th>
//                             <th>Date</th>
//                             <th>Time</th>
//                             <th>Duration</th>
//                             <th>Status</th>
//                             <th>Patient Id</th>
//                             <th>Doctor Id</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {records.map((a) => (
//                             <tr key={a.id}>
//                                 <td>{a.id}</td>
//                                 <td>{a.date}</td>
//                                 <td>{a.time}</td>
//                                 <td>{a.durationMinutes}</td>
//                                 <td>{a.status}</td>
//                                 <td>{a.patient?.patientId}</td>
//                                 <td>{a.doctor?.id}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             <div>
//                 <button disabled={pgno === 0} onClick={() => setPgno(pgno - 1)}>Previous</button>
//                 <button onClick={() => setPgno(pgno + 1)}>Next</button>
//             </div>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import axios from "axios";

export default function DisplayAppointmentsPaginated() {
    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [size, setSize] = useState(5);
    const [sorting, setSorting] = useState("id");
    const [asc, setAsc] = useState(true);

    const fetchAppointments = async () => {
        try {
            const url = "http://localhost:9002/api/appointment/getAllPaginated";
            const res = await axios.get(url, {
                params: { pgno, size, sorting, asc },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                
            });
            setRecords(res.data.content);
        } catch (err) {
            alert(err.response?.data?.message || "Error fetching appointments");
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [pgno, size, sorting, asc]);

    return (
        <div className="container mt-4">
            <h2>Paginated Appointments</h2>

            <div className="mb-3">
                <label className="form-label">Enter Page No</label>
                <input className="form-control" type="number" value={pgno} onChange={e => setPgno(Number(e.target.value))} />
            </div>

            <div className="mb-3">
                <label className="form-label">Enter Size of Page</label>
                <input className="form-control" type="number" value={size} onChange={e => setSize(Number(e.target.value))} />
            </div>

            <div className="mb-3">
                <label className="form-label">Select Sorting Column</label>
                <select className="form-select" value={sorting} onChange={e => setSorting(e.target.value)}>
                    <option value="id">Appointment Id</option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                    <option value="status">Status</option>
                    <option value="durationMinutes">Duration</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Order</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" checked={asc} onChange={() => setAsc(true)} />
                        <label className="form-check-label">Ascending</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" checked={!asc} onChange={() => setAsc(false)} />
                        <label className="form-check-label">Descending</label>
                    </div>
                </div>
            </div>

            {records.length > 0 && (
                <table className="table table-bordered table-striped mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Duration</th>
                            <th>Patient</th>
                            <th>Doctor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.date}</td>
                                <td>{a.time}</td>
                                <td>{a.status}</td>
                                <td>{a.durationMinutes} mins</td>
                                <td>{a.patient?.patientName} (ID: {a.patient?.patientId})</td>
                                <td>{a.doctor?.name} ({a.doctor?.department})</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="mt-3">
                <button className="btn btn-secondary me-2" disabled={pgno === 0} onClick={() => setPgno(pgno - 1)}>Previous</button>
                <button className="btn btn-secondary" onClick={() => setPgno(pgno + 1)}>Next</button>
            </div>
        </div>
    );
}
