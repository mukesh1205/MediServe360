import axios from "axios";
import { useState } from "react";

export default function DisplayInvoicesPaginated() {

    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState(0);
    const [size, setSize] = useState(0);
    const [sorting, setSorting] = useState("");
    const [asc, setAsc] = useState(true);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/fetchAllInvoicesPaginated";

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
            <h3>Display Invoices (Paginated)</h3>

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
                <option value="invoiceId">Invoice Id</option>
                <option value="amount">Amount</option>
                <option value="invoiceDate">Invoice Date</option>
                <option value="paymentStatus">Payment Status</option>
                <option value="paymentMode">Payment Mode</option>
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
            <button onClick={buttonHandler}>Get Invoices</button>

            {records.length > 0 && (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Invoice Id</th>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                            <th>Amount</th>
                            <th>Invoice Date</th>
                            <th>Payment Status</th>
                            <th>Payment Mode</th>
                            <th>Adjustment Amount</th>
                            <th>Refund Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {records.map((e) => (
                            <tr key={e.invoiceId}>
                                <td>{e.invoiceId}</td>
                                <td>{e.patient?.patientId}</td>
                                <td>{e.patient?.patientName}</td>
                                <td>{e.amount}</td>
                                <td>{e.invoiceDate}</td>
                                <td>{e.paymentStatus}</td>
                                <td>{e.paymentMode}</td>
                                <td>{e.adjustmentAmount}</td>
                                <td>{e.refundStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}