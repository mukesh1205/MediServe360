import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DisplayInvoices() {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const url = "http://localhost:9002/api/fetchAllInvoices";

        axios.get(url)
            .then((res) => {
                setInvoices(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h3>Display All Invoices</h3>

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
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((e) => (
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

                            <td>
                                <Link to={`/invoice/update/${e.invoiceId}`}>
                                    Edit
                                </Link>
                            </td>

                            <td>
                                <Link to={`/invoice/delete/${e.invoiceId}`}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}