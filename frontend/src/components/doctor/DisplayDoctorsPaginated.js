import { useEffect, useState } from "react";
import axios from "axios";

export default function DisplayDoctorsPaginated() {
    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [size, setSize] = useState(5);
    const [sorting, setSorting] = useState("id");
    const [asc, setAsc] = useState(true);

    const fetchDoctors = async () => {
        try {
            const url = "http://localhost:9002/api/doctor/getAllPaginated";
            const res = await axios.get(url, {
                params: { pgno, size, sorting, asc },
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                
            });
            setRecords(res.data.content);
        } catch (err) {
            alert(err.response?.data?.message || "Error fetching doctors");
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [pgno, size, sorting, asc]);

    return (
        <div>
            <h2>Doctors (Paginated)</h2>

            <label>Page No</label>
            <input type="number" value={pgno} onChange={e => setPgno(Number(e.target.value))} /><br />

            <label>Page Size</label>
            <input type="number" value={size} onChange={e => setSize(Number(e.target.value))} /><br />

            <label>Sort By</label>
            <select value={sorting} onChange={e => setSorting(e.target.value)}>
                <option value="id">Doctor Id</option>
                <option value="name">Name</option>
                <option value="department">Department</option>
                <option value="availabilitySchedule">Availability</option>
            </select><br />

            <label>Order</label>
            <input type="radio" checked={asc} onChange={() => setAsc(true)} /> Ascending
            <input type="radio" checked={!asc} onChange={() => setAsc(false)} /> Descending<br />

            {records.length > 0 && (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((d) => (
                            <tr key={d.id}>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.department}</td>
                                <td>{d.availabilitySchedule}</td>
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
