import axios from "axios";
import { useState } from "react";

export default function DisplayInsuranceClaimsPaginated() {

    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [size, setSize] = useState(0);
    const [sorting, setSorting] = useState("");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/fetchAllInsuranceClaimsPaginated";

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

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div>
            <h3>Display Insurance Claims (Paginated)</h3>

            <label>Enter Page No</label>
            <input
                type="number"
                onChange={(e) => setPgno(Number(e.target.value))}
            />
            <br />

            <label>Enter Page Size</label>
            <input
                type="number"
                onChange={(e) => setSize(Number(e.target.value))}
            />
            <br />

            <label>Select Sorting Column</label>
            <select onChange={(e) => setSorting(e.target.value)}>
                <option value="">--Select Column--</option>
                <option value="insuranceClaimId">Claim Id</option>
                <option value="policyNumber">Policy Number</option>
                <option value="amount">Amount</option>
                <option value="status">Status</option>
            </select>
            <br />

            <label>Order</label>

            <input
                type="radio"
                name="sortOrder"
                checked={asc === true}
                onChange={() => setAsc(true)}
            />
            <label>Ascending</label>

            <input
                type="radio"
                name="sortOrder"
                checked={asc === false}
                onChange={() => setAsc(false)}
            />
            <label>Descending</label>

            <br />
            <button onClick={buttonHandler}>Get Insurance Claims</button>

            {records.length > 0 && (
                <table border={1}>
                    <thead>
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
                                <td>{c.amount}</td>
                                <td>{c.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}