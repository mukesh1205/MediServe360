import { useState } from "react";
import axios from "axios";

export default function FindInvoice() {

    const [invoiceId, setInvoiceId] = useState("");
    const [invoice, setInvoice] = useState(null);

    const buttonHandler = async () => {
        try {
            if (!invoiceId) {
                alert("Please enter Invoice ID");
                return;
            }

            const url = "http://localhost:9002/api/invoice/getInvoiceById/" + invoiceId;
            const res = await axios.get(url,{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token") 
                    }
                });

            setInvoice(res.data.invoice);

        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert(err.response.data.errorMessage || "Invoice not found");
                setInvoice(null);
            } else {
                console.error(err);
                alert("Something went wrong");
            }
        }
    };

    return (
        <div>
            <h1>Find Invoice</h1>

            <label>Enter Invoice ID</label>
            <input
                type="number"
                onChange={(e) => setInvoiceId(e.target.value)}
            />
            <br />

            <button onClick={buttonHandler}>Find</button>

            {invoice && (
                <div>
                    <table border="1">
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
                            <tr>
                                <td>{invoice.invoiceId}</td>
                                <td>{invoice.patient?.patientId}</td>
                                <td>{invoice.patient?.patientName}</td>
                                <td>{invoice.amount}</td>
                                <td>{invoice.invoiceDate}</td>
                                <td>{invoice.paymentStatus}</td>
                                <td>{invoice.paymentMode}</td>
                                <td>{invoice.adjustmentAmount}</td>
                                <td>{invoice.refundStatus}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}