import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DisplayInvoicesPaginated() {

    const [records, setRecords] = useState([]);
    const [pgno, setPgno] = useState("");
    const [size, setSize] = useState("");
    const [sorting, setSorting] = useState("");
    const [asc, setAsc] = useState(true);
    const [searched, setSearched] = useState(false);

    const buttonHandler = async () => {
        try {
            const url = "http://localhost:9002/api/invoice/fetchAllInvoicesPaginated";

<<<<<<< HEAD
            if (pgno === "" || size === "" || sorting === "") {
                toast.warning("Please enter page number, size, and sorting column");
                return;
            }

            const params = {
                params: {
                    pgno: pgno,
=======
            const res = await axios.get(url, {params: {
                pgno: pgno,
>>>>>>> 0757f92c8fbce6f86f6ca66c9a6abae730f3f4db
                    size: size,
                    sorting: sorting,
                    asc: asc
            },
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }});
            setRecords(res.data.content);
            setSearched(true);

        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">Display Invoices Paginated</h3>

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
                    <option value="invoiceId">Invoice Id</option>
                    <option value="amount">Amount</option>
                    <option value="invoiceDate">Invoice Date</option>
                    <option value="paymentStatus">Payment Status</option>
                    <option value="paymentMode">Payment Mode</option>
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
                Get Invoices
            </button>

            {searched && records.length === 0 && (
                <p className="mt-3">No invoices found</p>
            )}

            {records.length > 0 && (
                <div className="table-responsive mt-4">
                    <table className="table table-bordered table-striped table-hover mt-3">
                        <thead className="table-dark">
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
                                    <td>₹ {Number(e.amount).toFixed(2)}</td>
                                    <td>{new Date(e.invoiceDate).toLocaleDateString()}</td>
                                    <td>{e.paymentStatus}</td>
                                    <td>{e.paymentMode}</td>
                                    <td>{e.adjustmentAmount}</td>
                                    <td>{e.refundStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}