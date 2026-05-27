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
            const url = "http://localhost:9002/api/appointments/getAllPaginated";
            const res = await axios.get(url, {
                params: { pgno, size, sorting, asc }
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
        <div>
            <h2>Appointments (Paginated)</h2>

            <label>Page No</label>
            <input type="number" value={pgno} onChange={e => setPgno(Number(e.target.value))} /><br />

            <label>Page Size</label>
            <input type="number" value={size} onChange={e => setSize(Number(e.target.value))} /><br />

            <label>Sort By</label>
            <select value={sorting} onChange={e => setSorting(e.target.value)}>
                <option value="id">Appointment Id</option>
                <option value="date">Date</option>
                <option value="time">Time</option>
                <option value="status">Status</option>
            </select><br />

            <label>Order</label>
            <input type="radio" checked={asc} onChange={() => setAsc(true)} /> Ascending
            <input type="radio" checked={!asc} onChange={() => setAsc(false)} /> Descending<br />

            {records.length > 0 && (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Patient Id</th>
                            <th>Doctor Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((a) => (
                            <tr key={a.id}>
                                <td>{a.id}</td>
                                <td>{a.date}</td>
                                <td>{a.time}</td>
                                <td>{a.durationMinutes}</td>
                                <td>{a.status}</td>
                                <td>{a.patient?.patientId}</td>
                                <td>{a.doctor?.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div>
                <button disabled={pgno === 0} onClick={() => setPgno(pgno - 1)}>Previous</button>
                <button onClick={() => setPgno(pgno + 1)}>Next</button>
            </div>
        </div>
    );
}
