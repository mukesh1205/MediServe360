import axios from "axios";
import { useState } from "react";

export default function PaginatedWard() {

    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [size, setSize] = useState(0);
    const [sorting, setSorting] = useState("");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/ward/getAllWardsPaginated";
            
            const res = await axios.get(url, 
                {params: {
                    pgno: pgno,
                    size: size,
                    sorting: sorting,
                    asc: asc
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
                });
            setRecords(res.data.content);
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="container mt-4">
            <h2>Paginated Wards</h2>

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
                    <option value="wardId">Ward Id</option>
                    <option value="wardname">Ward Name</option>
                    <option value="wardcapacity">Ward Capacity</option>
                    <option value="wardstatus">Ward Status</option>
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

            <button className="btn btn-primary" onClick={buttonHandler}>Get Wards</button>

            {records.length > 0 && (
                <table className="table table-bordered table-striped mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>Ward Id</th>
                            <th>Ward Name</th>
                            <th>Ward Capacity</th>
                            <th>Ward Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((e) => {
                            return (
                                <tr key={e.wardId}>
                                    <td>{e.wardId}</td>
                                    <td>{e.wardname}</td>
                                    <td>{e.wardcapacity}</td>
                                    <td>{e.wardstatus}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
