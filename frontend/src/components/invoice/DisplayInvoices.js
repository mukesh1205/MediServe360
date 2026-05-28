import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function DisplayInvoices() {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const url = "http://localhost:9002/api/invoice/fetchAllInvoices";

        axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                })
            .then((res) => {
                setInvoices(res.data);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }, []);

    return (
        <div className="container mt-4">
            
            <h3 className="mb-4">Display All Invoices</h3>

            {invoices.length === 0 ? (<p>No invoices found</p>):

            (<div className="table-responsive">
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
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((e) => (
                        <tr key={e.invoiceId}>
                            <td>{e.invoiceId}</td>

                            <td>{e.patient?.patientId}</td>
                            <td>{e.patient?.patientName}</td>

                            <td>₹ {Number(e.amount).toFixed(2)}</td>
                            <td>{new Date(e.invoiceDate).toLocaleDateString()}</td>
                            <td>{e.paymentStatus}</td>
                            <td>{e.paymentMode}</td>
                            <td>₹ {Number(e.adjustmentAmount).toFixed(2)}</td>
                            <td>{e.refundStatus}</td>

                            <td className="text-center">
                                <Link className="btn btn-warning btn-sm" to={`/invoice/update/${e.invoiceId}`}>
                                    Update
                                </Link>
                            </td>

                            <td className="text-center">
                                <Link className="btn btn-danger btn-sm" to={`/invoice/delete/${e.invoiceId}`}>
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>)}
        </div>
    );
}